import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config/config";
import { AuthPayload } from "../interfaces/auth";

export const generateToken = (payload: AuthPayload): string => {
  const options: SignOptions = {
    expiresIn: config.JWT_EXPIRES_IN as any,
  };

  // 2. Ganti config.JWT_SECRET menjadi hardcodedSecret
  return jwt.sign(payload, config.JWT_SECRET || "", options);
};
