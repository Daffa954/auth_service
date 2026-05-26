# Auth Service API

Service ini adalah layanan backend yang dibangun menggunakan Node.js, Express, dan TypeScript untuk menangani **Autentikasi User (Register/Login)**, **Manajemen Alamat User**, dan **Data Wilayah** (integrasi RajaOngkir). Service ini dirancang untuk bekerja di dalam arsitektur Microservices (diakses melalui API Gateway).

## 🚀 Tech Stack

* **Runtime:** Node.js
* **Language:** TypeScript
* **Framework:** Express.js
* **ORM:** Prisma
* **Database:** MySQL
* **Auth:** JWT (JSON Web Token), Bcryptjs
* **External API:** RajaOngkir (via Axios)

## 📦 Prerequisites

* Node.js (v18+)
* MySQL Database
* NPM / Yarn

## ⚙️ Setup & Instalasi

1.  **Clone repository** dan masuk ke direktori proyek.
2.  **Instal dependensi:**
    ```bash
    npm install
    ```
3.  **Setup Environment Variables:**
    Buat file `.env` di root folder dan isi dengan konfigurasi berikut:
    ```env
    DATABASE_URL="mysql://username:password@localhost:3306/nama_database"
    JWT_SECRET="secret_key_anda"
    RAJAONGKIR_API_KEY="api_key_rajaongkir_anda"
    AUTH_SERVICE_PASSWORD="password-auth-service"
    ```
4.  **Jalankan Migrasi Database:**
    ```bash
    npx prisma db push
    ```
5.  **Jalankan Service:**
    * Mode Development: `npm run dev`
    * Mode Produksi: `npm run build` lalu `npm start`

## 📡 API Endpoints

Semua endpoint diawali dengan prefix `/authservice` (sesuai konfigurasi di `src/index.ts`).

### Penting: Header Required
Setiap request ke service ini memerlukan header:
* **`X-Service-Password`**: `password-auth-service` (sesuai konfigurasi di `.env`)

---

### 1. Wilayah (Location)
* **GET** `/locations/provinces` - Mengambil daftar provinsi.
* **GET** `/locations/cities?province_id={id}` - Mengambil daftar kota.
* **GET** `/locations/districts?city_id={id}` - Mengambil daftar kecamatan (via RajaOngkir).

### 2. Autentikasi (Auth)
* **POST** `/auth/register` - Registrasi user baru.
* **POST** `/auth/login` - Login user.
* **POST** `/auth/logout` - Logout user.

### 3. Alamat (Address)
*Semua endpoint ini memerlukan Header tambahan:*
* **`Authorization`**: `Bearer <JWT_TOKEN>`

* **POST** `/addresses` - Menambah alamat baru.
* **GET** `/addresses` - Mengambil daftar alamat user yang sedang login.

---

## 🛠️ Middleware

1.  **`verifyPasswordService`**: Memastikan request yang masuk berasal dari Gateway yang valid dengan mengecek `X-Service-Password`.
2.  **`verifyToken`**: Memastikan user sudah login dengan memvalidasi JWT Token pada header `Authorization`.

## 📜 Script Commands

* `npm run dev`: Menjalankan server dalam mode *watch* (nodemon).
* `npm run build`: Mengompilasi TypeScript menjadi JavaScript (dist folder).
* `npm start`: Menjalankan aplikasi dari folder *dist*.

---

### Tips Tambahan
* **Debugging:** Jika terjadi error saat akses endpoint, pastikan `AUTH_SERVICE_PASSWORD` di `.env` gateway sama persis dengan yang ada di `.env` service ini.
* **Database:** Pastikan MySQL sudah menyala sebelum menjalankan `npx prisma db push`.
