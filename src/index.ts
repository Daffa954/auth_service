import 'dotenv/config'; // <-- TARUH DI BARIS 1 (Otomatis meload .env)
import express from "express";
import { config } from "./config/config";
import apiRoutes from "./routes/routes"; // Ubah nama variabel import agar lebih masuk akal
const app = express();

app.use(express.json());
// Registrasi endpoint API
app.use("/authservice", apiRoutes);
app.listen(config.PORT, () => {
  console.log(`Auth Service berjalan mulus di http://localhost:${config.PORT}`);
});
