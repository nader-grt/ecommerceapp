import {Request, Response,  Router } from "express";
import RefreshTokenUseCase from "../../useCases/Auth/RefreshTokenUseCase";
import RefreshTokenController from "../../controllers/auth/RefreshTokenController";
import { verifyRefreshToken } from "../../middleware/verifyRefreshToken";
import { RequestAuth } from "../../middleware/verifyToken";



const router = Router()

 const       refreshTokenUseCase     = new  RefreshTokenUseCase()
 const      refreshTokenRoute       = new RefreshTokenController(refreshTokenUseCase)

 router.post("/refresh-token", verifyRefreshToken,(req:RequestAuth,res:Response) => {
    const user = req.user;
       console.log( "step 1 rout "  ,user)
     //  

    refreshTokenRoute.execute(req,res)
})

export default router