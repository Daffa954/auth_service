import { Request, Response } from "express";
import { locationService } from "../service/locationService";

// Langsung export const dengan object yang berisi fungsi-fungsi
export const locationController = {
  
  getProvinces: async (req: Request, res: Response): Promise<any> => {
    try {
      const provinces = await locationService.getAllProvinces();
      return res.status(200).json({
        message: "Berhasil mengambil data provinsi",
        data: provinces,
      });
    } catch (error) {
      console.error("Get Provinces Error:", error);
      return res.status(500).json({
        message: "Terjadi kesalahan pada server saat mengambil data provinsi",
      });
    }
  }, // <-- Gunakan Koma (,) untuk memisahkan antar fungsi, bukan titik koma (;)

  getCities: async (req: Request, res: Response): Promise<any> => {
    try {
      const { province_id } = req.query;

      if (!province_id) {
        return res.status(400).json({ message: "Parameter province_id wajib diisi!" });
      }

      const cities = await locationService.getCitiesByProvince(Number(province_id));

      return res.status(200).json({
        message: "Berhasil mengambil data kota/kabupaten",
        data: cities,
      });
    } catch (error) {
      console.error("Get Cities Error:", error);
      return res.status(500).json({
        message: "Terjadi kesalahan pada server saat mengambil data kota",
      });
    }
  }, // <-- Koma di sini

  getDistricts: async (req: Request, res: Response): Promise<any> => {
    try {
      const { city_id } = req.query;

      if (!city_id) {
        return res.status(400).json({ message: "Parameter city_id wajib diisi!" });
      }

      const districts = await locationService.getDistrictsByCity(Number(city_id));

      return res.status(200).json({
        message: "Berhasil mengambil data kecamatan",
        data: districts,
      });
    } catch (error: any) {
      console.error("Get Districts Error:", error);
      const errorMessage =
        error.response?.data?.rajaongkir?.status?.description ||
        "Gagal menyambungkan ke server RajaOngkir";

      return res.status(500).json({ message: errorMessage });
    }
  }

}; 
