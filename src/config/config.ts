import dotenv from "dotenv";

// Panggil config sebelum variabel diekstrak
dotenv.config();
export const config = {
  PORT: process.argv[2] || 4000,
  JWT_SECRET: process.env.JWT_SECRET,
  RAJAONGKIR_API_KEY: process.env.RAJAONGKIR_API_KEY || "",
  JWT_EXPIRES_IN: "24h",
  AUTH_SERVICE_PASSWORD: process.env.AUTH_SERVICE_PASSWORD || "",
};
