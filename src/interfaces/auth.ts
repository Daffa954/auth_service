// Enum Role (Samakan dengan schema.prisma)
export enum Role {
  USER = 'USER',
  SELLER = 'SELLER'
}

// Interface standar untuk User
export interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  password?: string; // Opsional agar bisa disembunyikan
  phone_number?: string | null;
  role: Role;
}

// DTO (Data Transfer Object) untuk data yang dikirim saat Register
export interface RegisterDTO {
  username: string;
  fullname: string;
  email: string;
  password: string;
 phone_number?: string | undefined; // <-- Tambahkan | undefined
  role?: Role | undefined;
}

// DTO untuk data yang dikirim saat Login
export interface LoginDTO {
  email: string; // Di controller kita set ini bisa menerima email ATAU username
  password: string;
}

// Payload untuk di dalam token JWT (Ditambah role agar lebih lengkap)
export interface AuthPayload {
  userId: string;
  email: string;
  role?: Role;
}