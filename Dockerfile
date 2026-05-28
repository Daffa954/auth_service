# ==========================================
# Tahap 1: Builder (Kompilasi TypeScript)
# ==========================================
FROM node:20-alpine AS builder

# Set direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan install semua dependencies (termasuk devDependencies seperti TypeScript)
COPY package*.json ./
RUN npm install

# Salin seluruh source code aplikasi
COPY . .

# Compile TypeScript menjadi JavaScript (biasanya masuk ke folder /dist)
RUN npm run build

# ==========================================
# Tahap 2: Runner (Server Produksi)
# ==========================================
FROM node:20-alpine

WORKDIR /app

# Salin package.json lagi, tapi kali ini install HANYA dependencies untuk produksi
COPY package*.json ./
RUN npm install --omit=dev

# Salin HANYA hasil build (folder /dist) dari tahap 1
COPY --from=builder /app/dist ./dist

# Ekspos port API Gateway (Berdasarkan kodingan sebelumnya, biasanya port 2000)
EXPOSE 4000

# Jalankan aplikasi yang sudah dicompile
CMD ["node", "dist/index.js"]