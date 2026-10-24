import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// ============================================================================
// STUDY NOTE: Express Custom Request Type Extension
// We extend Express's default Request interface to append authenticated user info.
// ============================================================================
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer <TOKEN>

  if (!token) {
    res.status(401).json({ message: 'Access Denied: No Token Provided' });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback_secret'
    ) as { userId: string; role: string };

    req.user = decoded;
    next(); // Pass execution to the next middleware or controller function
  } catch (err) {
    res.status(403).json({ message: 'Invalid or Expired Token' });
    return;
  }
};