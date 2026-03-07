import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';

export interface AuthenticatedRequest extends Request {
  userId: string;
}

/**
 * Express middleware that validates a Bearer JWT access token.
 * Attaches `req.userId` on success; responds 401 on failure.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid Authorization header' });
    return;
  }

  const token = authHeader.slice(7);
  try {
    const payload = authService.verifyAccessToken(token);
    (req as AuthenticatedRequest).userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired access token' });
  }
}
