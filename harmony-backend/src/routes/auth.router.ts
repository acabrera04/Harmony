import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { authService } from '../services/auth.service';

export const authRouter = Router();

// ─── Input schemas ────────────────────────────────────────────────────────────

const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(32).regex(/^[a-zA-Z0-9_-]+$/, {
    message: 'Username may only contain letters, numbers, underscores, and hyphens',
  }),
  password: z.string().min(8).max(72),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const logoutSchema = z.object({
  refreshToken: z.string().min(1),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

// ─── Error helper ─────────────────────────────────────────────────────────────

function trpcCodeToHttp(code: TRPCError['code']): number {
  switch (code) {
    case 'UNAUTHORIZED':
      return 401;
    case 'FORBIDDEN':
      return 403;
    case 'NOT_FOUND':
      return 404;
    case 'CONFLICT':
      return 409;
    case 'BAD_REQUEST':
      return 400;
    default:
      return 500;
  }
}

function handleError(res: Response, err: unknown): void {
  if (err instanceof TRPCError) {
    res.status(trpcCodeToHttp(err.code)).json({ error: err.message });
    return;
  }
  if (err instanceof z.ZodError) {
    res.status(400).json({ error: 'Validation failed', details: err.errors });
    return;
  }
  console.error('Auth route error:', err);
  res.status(500).json({ error: 'Internal server error' });
}

// ─── Routes ───────────────────────────────────────────────────────────────────

/**
 * POST /api/auth/register
 * Creates a new user account and returns access + refresh tokens.
 */
authRouter.post('/register', async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Validation failed', details: parsed.error.errors });
    return;
  }

  try {
    const { email, username, password } = parsed.data;
    const tokens = await authService.register(email, username, password);
    res.status(201).json(tokens);
  } catch (err) {
    handleError(res, err);
  }
});

/**
 * POST /api/auth/login
 * Authenticates a user and returns access + refresh tokens.
 */
authRouter.post('/login', async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Validation failed', details: parsed.error.errors });
    return;
  }

  try {
    const { email, password } = parsed.data;
    const tokens = await authService.login(email, password);
    res.status(200).json(tokens);
  } catch (err) {
    handleError(res, err);
  }
});

/**
 * POST /api/auth/logout
 * Revokes the provided refresh token.
 */
authRouter.post('/logout', async (req: Request, res: Response) => {
  const parsed = logoutSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Validation failed', details: parsed.error.errors });
    return;
  }

  try {
    await authService.logout(parsed.data.refreshToken);
    res.status(204).send();
  } catch (err) {
    handleError(res, err);
  }
});

/**
 * POST /api/auth/refresh
 * Issues new access + refresh tokens using a valid refresh token (rotation).
 */
authRouter.post('/refresh', async (req: Request, res: Response) => {
  const parsed = refreshSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Validation failed', details: parsed.error.errors });
    return;
  }

  try {
    const tokens = await authService.refreshTokens(parsed.data.refreshToken);
    res.status(200).json(tokens);
  } catch (err) {
    handleError(res, err);
  }
});
