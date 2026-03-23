/**
 * Typed error thrown by trpcQuery and trpcMutate in trpc-client.ts.
 *
 * Callers that need to branch on HTTP status (e.g. 403 → non-member) should use
 * `err instanceof TrpcHttpError && err.status === 403` rather than string-matching
 * err.message, which would couple them to the exact error format in trpc-client.ts.
 *
 * Extracted to its own file so it can be imported by both server-side (trpc-client.ts)
 * and client-side (GuestChannelView.tsx) code, and tested without pulling in
 * next/headers or other server-only dependencies.
 */
export class TrpcHttpError extends Error {
  constructor(
    public readonly procedure: string,
    public readonly status: number,
    body: string,
  ) {
    super(`tRPC error [${procedure}]: ${status} — ${body.slice(0, 200)}`);
    this.name = 'TrpcHttpError';
  }
}
