import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Role } from "../models/user";

export async function generateRefreshToken(
  email: string,
  role: Role,
  id: number
): Promise<string> {
  return jwt.sign(
    {
      email,
      role,
      id,
      jti: crypto.randomUUID(),
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
}