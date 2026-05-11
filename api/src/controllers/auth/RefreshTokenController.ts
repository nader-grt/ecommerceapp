import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import RefreshTokenUseCase from "../../useCases/Auth/RefreshTokenUseCase";

export default class RefreshTokenController extends BaseController {
  private refreshUseCase: RefreshTokenUseCase;

  constructor(refreshUseCase: RefreshTokenUseCase) {
    super();
    this.refreshUseCase = refreshUseCase;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      console.log("step 2  controller  ", refreshToken);
      if (!refreshToken) {
        return res.status(401).json({
          message: "refresh token missing",
        });
      }

      const result = await this.refreshUseCase.execute(refreshToken);

      if (!result.success) {
        return res.status(403).json(result);
      }

      res.cookie("refreshToken", result.data?.refreshToken, {
        httpOnly: true,
        secure: false, //
        sameSite: "lax", //
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7
      });

      return res.json({
        accessToken: result.data?.accessToken,
      });
      // return res.status(200).json(result);
    } catch (err: any) {
      return this.unauthorized(res, err.message);
    }
  }
}
