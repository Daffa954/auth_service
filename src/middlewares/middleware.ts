import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

// Memperluas tipe Request Express agar bisa menyisipkan data 'user'
export interface AuthRequest extends Request {
  user?: any;
}

export const verifyPasswordService = (req: Request, res: Response, next: NextFunction): any => {
  const servicePassword = req.headers['x-service-password'];
  if (servicePassword !== config.AUTH_SERVICE_PASSWORD) {
    return res.status(403).json({ message: 'Forbidden: Invalid service password' });
  }
  next();
};


export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): any => {
  // Ambil token dari header "Authorization: Bearer <token>"
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak! Token tidak ditemukan.' });
  }

  try {
    // Verifikasi dan ekstrak isi token
    const decoded = jwt.verify(token, config.JWT_SECRET as string);
    req.user = decoded; // Berisi { userId, email, role } dari payload JWT
    next(); // Lanjut ke Controller
  } catch (error) {
    return res.status(403).json({ message: 'Sesi tidak valid atau telah kedaluwarsa!' });
  }
};