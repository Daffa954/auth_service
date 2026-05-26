import { Response } from 'express';
import { AuthRequest } from '../middlewares/middleware'; // Pastikan path ini benar sesuai strukturmu
import { addressService } from '../service/addressService';

export const addressController = {
  
  createAddress: async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      // req.user didapat dari middleware verifyToken
      const userId = req.user.userId; 
      const addressData = req.body;
      

      // Validasi sederhana (pastikan field wajib tidak kosong)
      if (!addressData.full_address || !addressData.province_id || !addressData.city_id || !addressData.district_id) {
        return res.status(400).json({ message: 'Data alamat tidak lengkap!' });
      }

      const newAddress = await addressService.addAddress(userId, addressData);

      return res.status(201).json({
        message: 'Alamat berhasil ditambahkan',
        data: newAddress,
      });
    } catch (error) {
      console.error('Add Address Error:', error);
      return res.status(500).json({ message: 'Terjadi kesalahan internal server saat menyimpan alamat.' });
    }
  }, // <-- Koma pemisah

  getAddress: async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      // Ambil userId dari token
      const userId = req.user.userId;

      // Ambil daftar alamat dari service
      const addresses = await addressService.getUserAddresses(userId);

      return res.status(200).json({
        message: 'Berhasil mengambil daftar alamat',
        data: addresses,
      });
    } catch (error) {
      console.error('Get Address Error:', error);
      return res.status(500).json({ message: 'Terjadi kesalahan internal server saat mengambil data alamat.' });
    }
  }

};