import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import RefreshTokenRepo from "../../repo/auth/userRepo/RefreshTokenRepo";


export default class LogoutController extends BaseController
{
      private _refreshTokenRepo = new RefreshTokenRepo();

      protected async executeImpl(req:Request,res:Response): Promise<any> {
         
           const {refreshToken} = req.body ;
           await this._refreshTokenRepo.revokeToken(refreshToken);
           return { success: true, message: "Logged out successfully" };
      }
    
    
}