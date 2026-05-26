import prisma from "../config/prisma";
import axios from "axios";
import "dotenv/config";

const RAJAONGKIR_KEY = process.env.RAJAONGKIR_API_KEY || "";
const BASE_URL = "https://rajaongkir.komerce.id/api/v1";
export const locationService = {
  // Ambil semua provinsi dari database lokal MySQL
  async getAllProvinces() {
    return await prisma.province.findMany({
      orderBy: { id: "asc" },
    });
  },

  // Ambil kota berdasarkan ID Provinsi dari database lokal MySQL
  async getCitiesByProvince(provinceId: number) {
    return await prisma.city.findMany({
      where: { province_id: provinceId },
      orderBy: { name: "asc" },
    });
  },

  // Ambil kecamatan dari API RajaOngkir (karena tidak ada master tabelnya)
  async getDistrictsByCity(cityId: number) {
    const response = await axios.get(
      `${BASE_URL}/destination/district/${cityId}`,
      {
        headers: { Key: RAJAONGKIR_KEY },
      },
    );
    return response.data.data
  },
};
