import { Request, Response } from 'express';
import { generateToken } from '../utils/jwtHelper';
import { authService } from '../service/authService';
import { RegisterDTO } from '../interfaces/auth';

export const authController = {
  
  register: async (req: Request<{}, any, RegisterDTO>, res: Response): Promise<any> => {
    try {
      // 1. Ekstrak 'role' dari req.body
      const { username, fullname, email, password, phone_number, role } = req.body;

      if (!username || !fullname || !email || !password) {
        return res.status(400).json({ message: 'Username, Fullname, Email, dan Password wajib diisi!' });
      }

      // 2. Lempar 'role' ke Service
      const newUser = await authService.registerUser({
        username, fullname, email, password, phone_number, role
      });

      const token = generateToken({
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role as any
      });

      return res.status(201).json({
        message: 'Registrasi berhasil, Anda sudah otomatis login',
        data: {
          token, 
          user: {
            id: newUser.id,
            username: newUser.username,
            fullname: newUser.fullname,
            email: newUser.email,
            role: newUser.role, // Akan menampilkan 'SELLER' jika dikirim dari body, atau 'USER' jika tidak dikirim
            created_at: newUser.created_at
          }
        },
      });

    } catch (error: any) {
      if (error.message === 'Email_Exists') {
        return res.status(400).json({ message: 'Email sudah terdaftar!' });
      }
      if (error.message === 'Username_Exists') {
        return res.status(400).json({ message: 'Username sudah digunakan!' });
      }
      
      console.error('Register Error:', error);
      return res.status(500).json({ message: 'Terjadi kesalahan internal server.' });
    }
  },

  login: async (req: Request, res: Response): Promise<any> => {
    try {
      // Kita anggap field 'email' di form login bisa diisi email maupun username
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email/Username dan Password wajib diisi!' });
      }

      // 1. Lempar ke Service
      const user = await authService.loginUser({ email, password });

      // 2. Buat Token JWT
      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role as any 
      });

      // 3. Response Sukses
      return res.status(200).json({
        message: 'Login berhasil',
        data: {
          token,
          user: {
            id: user.id,
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            role: user.role
          },
        },
      });

    } catch (error: any) {
      // 4. Tangkap Error Spesifik
      if (error.message === 'User_Not_Found' || error.message === 'Invalid_Password') {
        // Selalu samarkan pesan error login demi keamanan (Cybersecurity best practice)
        return res.status(401).json({ message: 'Email/Username atau Password salah!' });
      }

      console.error('Login Error:', error);
      return res.status(500).json({ message: 'Terjadi kesalahan internal server.' });
    }
  }, // <-- Koma pemisah

  logout: async (req: Request, res: Response): Promise<any> => {
    try {
     
      return res.status(200).json({ 
        message: 'Logout berhasil. Silakan hapus token di sisi klien.' 
      });
    } catch (error) {
      console.error('Logout Error:', error);
      return res.status(500).json({ message: 'Terjadi kesalahan saat logout.' });
    }
  }

}; 