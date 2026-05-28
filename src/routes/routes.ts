import { Router } from "express";
import { locationController } from "../controllers/locationController";
import { authController } from "../controllers/authController";
import { verifyPasswordService, verifyToken } from "../middlewares/middleware";
import { addressController } from "../controllers/addressController";

const router = Router();

// Endpoint utama wilayah/lokasi
// --- Endpoint LOKASI ---

//add headers "X-Sercvice-Password" with value from .env AUTH_SERVICE_PASSWORD to all request

router.get(
  "/locations/provinces",
  verifyPasswordService,
  locationController.getProvinces,
);
router.get(
  "/locations/cities",
  verifyPasswordService,
  locationController.getCities,
);
router.get(
  "/locations/districts",
  verifyPasswordService,
  locationController.getDistricts,
);

// --- Endpoint AUTH ---
router.post("/auth/register", verifyPasswordService, authController.register);
router.post("/auth/login", verifyPasswordService, authController.login);
router.post("/auth/logout", verifyPasswordService, authController.logout);
router.get("/auth/profile", [verifyToken, verifyPasswordService], authController.getProfile);

// --- Endpoint ADDRESS ---
router.post(
  "/addresses",
  [verifyToken, verifyPasswordService],
  addressController.createAddress,
);
router.get(
  "/addresses",
  [verifyToken, verifyPasswordService],
  addressController.getAddress,
);

export default router;
