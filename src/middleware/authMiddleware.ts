import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface User {
  id: number
};

interface RequestUser extends Request {
  user?: User,
}

export const authenticate = (req: RequestUser, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, 'secret') as any;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.'});
  }
};
