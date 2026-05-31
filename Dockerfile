# Tahap 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

# Tahap 2: Runner
FROM node:20-alpine
WORKDIR /app

# Copy package.json dan install production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Install prisma secara global agar dikenali oleh sistem container
RUN npm install -g prisma@6

# Copy hasil build dan folder prisma yang sudah di-generate
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 4000

# Langsung panggil 'prisma' (tanpa npx) karena sudah diinstal global
CMD prisma db push && node dist/index.js