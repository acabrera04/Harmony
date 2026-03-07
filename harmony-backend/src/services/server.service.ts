import { Server, Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { prisma } from '../db/prisma';

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function generateUniqueSlug(name: string): Promise<string> {
  const base = generateSlug(name);
  if (!base) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Cannot generate slug from name' });

  let candidate = base;
  let suffix = 1;
  while ((await prisma.server.count({ where: { slug: candidate } })) > 0) {
    candidate = `${base}-${suffix}`;
    suffix++;
  }
  return candidate;
}

async function createWithSlugRetry(
  input: { name: string; slug: string; description?: string; iconUrl?: string; isPublic?: boolean; ownerId: string },
  maxRetries = 3,
): Promise<Server> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const slug = attempt === 0 ? input.slug : await generateUniqueSlug(input.name);
    try {
      return await prisma.server.create({ data: { ...input, slug } });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002' &&
        attempt < maxRetries - 1
      ) {
        continue;
      }
      throw err;
    }
  }
  throw new TRPCError({ code: 'CONFLICT', message: 'Unable to generate a unique slug' });
}

export const serverService = {
  async getPublicServers(): Promise<Server[]> {
    return prisma.server.findMany({ where: { isPublic: true }, orderBy: { createdAt: 'desc' } });
  },

  async getServer(slug: string): Promise<Server | null> {
    return prisma.server.findUnique({ where: { slug } });
  },

  async createServer(input: {
    name: string;
    description?: string;
    iconUrl?: string;
    isPublic?: boolean;
    ownerId: string;
  }): Promise<Server> {
    const slug = await generateUniqueSlug(input.name);
    return createWithSlugRetry({ ...input, slug });
  },

  async updateServer(
    id: string,
    actorId: string,
    data: { name?: string; description?: string; iconUrl?: string; isPublic?: boolean },
  ): Promise<Server> {
    const server = await prisma.server.findUnique({ where: { id } });
    if (!server) throw new TRPCError({ code: 'NOT_FOUND', message: 'Server not found' });
    if (server.ownerId !== actorId) throw new TRPCError({ code: 'FORBIDDEN', message: 'Only the server owner can update' });

    const updateData: typeof data & { slug?: string } = { ...data };
    if (data.name && data.name !== server.name) {
      const slug = await generateUniqueSlug(data.name);
      // Retry on slug collision (P2002)
      const maxRetries = 3;
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        updateData.slug = attempt === 0 ? slug : await generateUniqueSlug(data.name);
        try {
          return await prisma.server.update({ where: { id }, data: updateData });
        } catch (err) {
          if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === 'P2002' &&
            attempt < maxRetries - 1
          ) {
            continue;
          }
          throw err;
        }
      }
      throw new TRPCError({ code: 'CONFLICT', message: 'Unable to generate a unique slug' });
    }
    return prisma.server.update({ where: { id }, data: updateData });
  },

  async deleteServer(id: string, actorId: string): Promise<Server> {
    const server = await prisma.server.findUnique({ where: { id } });
    if (!server) throw new TRPCError({ code: 'NOT_FOUND', message: 'Server not found' });
    if (server.ownerId !== actorId) throw new TRPCError({ code: 'FORBIDDEN', message: 'Only the server owner can delete' });
    return prisma.server.delete({ where: { id } });
  },
};
