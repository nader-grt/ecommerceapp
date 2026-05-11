import { Role } from "../models/user";
import jwt from "jsonwebtoken";


export default async function generateAccessToken(
  email: string,
  role: Role,
  id: number
): Promise<string> {
  const payload = { email, role, id };

 //ACCESS_TOKEN_SECRET!
  return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET! as string, {
    expiresIn: "7h",  // 20m
  });
}
