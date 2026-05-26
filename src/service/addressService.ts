import prisma from "../config/prisma";
import { CreateAddressDTO } from "../interfaces/address";

export const addressService = {
  async addAddress(userId: string, data: CreateAddressDTO) {
    const numericUserId = Number(userId);
    const newAddress = await prisma.address.create({
      data: {
        ...data,
        user_id: numericUserId, // Diambil otomatis dari token, bukan dari inputan form
      },
    });
    return newAddress;
  },
  async getUserAddresses(userId: string) {
    const numericUserId = Number(userId);
    const addresses = await prisma.address.findMany({
      where: {
        user_id: numericUserId,
      },
      // Urutkan alamat terbaru di paling atas (opsional tapi disarankan)
      orderBy: {
        id: "desc",
      },
    });
    return addresses;
  },
};
