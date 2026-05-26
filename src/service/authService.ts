import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import { RegisterDTO, LoginDTO } from "../interfaces/auth"; // Sesuaikan jika kamu punya file interfaces

export const authService = {
  // --- FUNGSI REGISTER ---
  async registerUser(data: RegisterDTO) {
    // 1. Validasi keberadaan user
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === data.email) throw new Error("Email_Exists");
      throw new Error("Username_Exists");
    }

    // 2. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // 3. Simpan ke Database
    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        fullname: data.fullname,
        email: data.email,
        password: hashedPassword,
        phone_number: data.phone_number || null,
        // Role otomatis 'USER'
        ...(data.role && { role: data.role }),
      },
    });

    return newUser;
  },

  // --- FUNGSI LOGIN ---
  async loginUser(data: LoginDTO) {
    // 1. Cari user berdasarkan email ATAU username (lebih fleksibel!)
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.email }], // data.email bisa diisi email atau username
      },
    });

    if (!user) throw new Error("User_Not_Found");

    // 2. Cek Password
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new Error("Invalid_Password");

    return user;
  },
};
