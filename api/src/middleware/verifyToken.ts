import { Request, Response, NextFunction } from "express";
import { Role } from "../models/user";
import jwt from "jsonwebtoken";
import extractIdFromUser from "./extractIdFromUser";

export interface RequestAuth extends Request {
  user?: {
    email: string;
    role: Role;
    id: number;
  };
}

export function verifyToken(
  req: RequestAuth,
  res: Response,
  next: NextFunction
): any {
  const authHeader = req.headers.authorization;


  const headerToken = req.headers.authorization?.split(" ")[1];
  const cookieToken = req.cookies?.refreshToken;

  const token = headerToken || cookieToken;

console.log("token verfy token step 2 ",token)

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided" });
  } // ACCESS_TOKEN_SECRET  befor use JWT_SECRET

  try {
    const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    req.user = {
      email: decoded.email,
      role: decoded.role,
      id: decoded.id,
    };

    // console.log("222222222222222222222222",   req.user  ,"333333333333333333333   ",decoded.id )
    extractIdFromUser(decoded.id);
    next();
  } catch (err: any) {
    if (err?.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Access token expired",
      });
    }

    return res.status(401).json({
      message: "Invalid access token",
    });
  }
}

//  token user eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdGVzdC5jb20iLCJyb2xlIjoidXNlciIsImlkIjoyLCJpYXQiOjE3NjkyODE2Nzd9.eqrYjvB0Goh3tGhFXDZkAKgzB0ImD0-TxfhKuNxcQng

/**
 * 



  node
const jwt = require("jsonwebtoken");

//> require("jsonwebtoken").sign({ id: 1 ,
email:"admin@test.com",role:"ADMIN"}, "467b6483be6518a7132630d80b43f54c002c312bdd2da068242540282079439f",  { expiresIn: "7h" }) ;


 node
const jwt = require("jsonwebtoken");

Welcome to Node.js v22.17.0.
Type ".help" for more information.
> 





'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkB0ZXN0LmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzcxMzQ3OTI5fQ.81cNKQMcGddoVYlVqDi8sh71LnkIRK3LkHO3Vuey7DQ'

node
const jwt = require("jsonwebtoken");

require("jsonwebtoken").sign(
  { id: 5, email: "user4@test.com", role: "USER" },
  "467b6483be6518a7132630d80b43f54c002c312bdd2da068242540282079439f",
  { expiresIn: "7h" }
);


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ1c2VyNEB0ZXN0LmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzcxMzQ5NDM5LCJleHAiOjE3NzEzNzQ2Mzl9.
rDuYbllT9C4Tjv1P-PJVSsW_dwABAj6waRijg77FQ4s




require("jsonwebtoken").sign(
  { id: 1, email: "user4@test.com", role: "ADMIN" },
  "467b6483be6518a7132630d80b43f54c002c312bdd2da068242540282079439f",
  { expiresIn: "7h" }
);

'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ1c2VyNEB0ZXN0LmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzcxNTM4MjYzLCJleHAiOjE3NzE1NjM0NjN9.6C34tQhzZgzx3O3MrPpTfL9fWv7kkKucCAMelY__hHM



 *token user 4




 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ1c2VyNEB0ZXN0LmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzcyMzIwOTMzLCJleHAiOjE3NzIzNDYxMzN9.rmYHfGp_PgwwGemCAbI6aUPzK9Hzu8cHTtpMjYWwOoI 




 admin eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkB0ZXN0LmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3MTgxNjA4NCwiZXhwIjoxNzcxODQxMjg0fQ.mTvybNnF0rE-2P7MeLc8tWCHOs7RSLo6awfMMgdMz8k'







 token admin 

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkB0ZXN0LmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3MTcwODE5NiwiZXhwIjoxNzcxNzMzMzk2fQ.Gs8-IyJXZGRDnHylQIS5cAHQoIasRuWL31jQYzPlag0


 */
