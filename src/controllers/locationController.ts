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
      // 1. Cek kedua kemungkinan nama parameter (berjaga-jaga jika frontend typo)
      const province_id_str = req.query.province_id || req.query.provinces_id;

      // 2. Validasi ketat SEBELUM melempar ke Number()
      if (!province_id_str || isNaN(Number(province_id_str))) {
        return res.status(400).json({
          success: false,
          message: "Parameter province_id wajib diisi dan harus berupa angka!",
        });
      }

      // 3. Konversi ke angka secara aman
      const provinceId = parseInt(province_id_str as string, 10);

      // 4. Panggil service
      const cities = await locationService.getCitiesByProvince(provinceId);

      return res.status(200).json({
        success: true,
        message: "Berhasil mengambil data kota/kabupaten",
        data: cities,
      });
    } catch (error) {
      console.error("Get Cities Error:", error);
      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan pada server saat mengambil data kota",
      });
    }
  },

  getDistricts: async (req: Request, res: Response): Promise<any> => {
    try {
      const { city_id } = req.query;

      if (!city_id) {
        return res
          .status(400)
          .json({ message: "Parameter city_id wajib diisi!" });
      }

      const districtsData = await locationService.getDistrictsByCity(Number(city_id));
      return res.status(200).json({
        message: "Berhasil mengambil data kecamatan",
        districts: districtsData,
      });
    } catch (error: any) {
      console.error("Get Districts Error:", error);
      const errorMessage =
        error.response?.data?.rajaongkir?.status?.description ||
        "Gagal menyambungkan ke server RajaOngkir";

      return res.status(200).json({
        message: errorMessage,
        districts: [
          {
            id: "1", // atau id: 1
            name: "Bebas", // atau name: "Bebas"
          },
        ],
      });
    }
  },
};
