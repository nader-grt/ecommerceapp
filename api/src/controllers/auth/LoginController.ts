import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import Joi from "joi";

import { RequestAuth } from "../../middleware/verifyToken";

import LoginUseCase from "../../useCases/Auth/LoginUseCase";

export default class LoginController extends BaseController {
  private _loginUserUseCase!: LoginUseCase;

  constructor(loginUserUseCase: LoginUseCase) {
    super();
    this._loginUserUseCase = loginUserUseCase;
  }

  protected async executeImpl(req: RequestAuth, res: Response): Promise<any> {
    const { email, password } = req.body;
    // steps
    /**
     *
     * 1. validate input
     * 2. check if user exists
     * 3. compare password
     * 4. generate token
     * 5. send response
     */

    const userInputLogin: any = {
      email: email,
      password: password,
    };

    const userSchemaLogin = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
    });

    try {
      const { error, value } = userSchemaLogin.validate(userInputLogin);

      if (error) {
        return this.badRequest(res, error.details[0].message);
      }

      const result = await this._loginUserUseCase.execute(value);

      console.log("result one   ", result);
      if (!result.success) {
        return this.fail(res, result.message);
      }

      res.cookie("accessToken", result.data.accessToken, {
        httpOnly: true,
        secure: false, // localhost
        sameSite: "lax",
        // path: "/",
        maxAge: 1000 * 60 * 60 * 7,
      });

      res.cookie("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        // path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      return this.resultValue(res, "login with success ", result.data);
    } catch (error) {
      console.log(error);
    }
  }
}
