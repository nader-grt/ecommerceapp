import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import Joi from "joi";

import UserDomain from "../../models/domain/auth/user/userDomain";
import generateAccessToken from "../../middleware/generateAccessToken";
import { generateRefreshToken } from "../../middleware/generateRefreshToken";
import { userRepo } from "../../repo/auth/userRepo/userRepo";

export default class RegisterController extends BaseController {
  private _userDomain = new UserDomain();
  private _userRepo = new userRepo();

  protected async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        phone: Joi.string().min(6).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string()
          .valid("user", "admin", "supplier", "deliverer", "secrtrie")
          .optional(),
      });

      const { error, value } = schema.validate(req.body);
      if (error) return this.badRequest(res, error.details[0].message);

      const { firstName, lastName, phone, email, password, role } = value;

      const exists = await this._userRepo.IsExistUser(email);
      if (exists) return this.conflict(res, "User already exists");

      // ================= DOMAIN =================

      this._userDomain.setFirstName = firstName;
      this._userDomain.setLastName = lastName;
      this._userDomain.setPhone = phone;
      this._userDomain.setEmail = email;
      this._userDomain.setRole = role;

      // ❗ hashing داخل domain فقط
      await this._userDomain.setHashedPassword(password);

      // ================= SAVE =================

      const savedUser:any = await this._userRepo.registerUser({
        firstName: this._userDomain.getFirstName,
        lastName: this._userDomain.getLastName,
        phone: this._userDomain.getPhone,
        email: this._userDomain.getEmail,
        password: this._userDomain.getPassword!, // hashed
        role: this._userDomain.getRole,
      });

      // ================= TOKENS =================

      const accessToken = await generateAccessToken(
        savedUser.email,
        savedUser.role,
        savedUser.id
      );

      const refreshToken = await generateRefreshToken(
        savedUser.email,
        savedUser.role,
        savedUser.id
      );

      // ================= COOKIES =================

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 7,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      // ================= RESPONSE =================

      return this.ok(res, {
        message: "User registered successfully",
        user: {
          id: savedUser.id,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          role: savedUser.role,
        },
        tokens: {
          accessToken,
          refreshToken,
        },
      });
    } catch (err: any) {
      console.error(err);
      //return this.internalServerError(res, "Something went wrong");
    }
  }
}