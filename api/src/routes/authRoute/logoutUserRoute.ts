

import { Request, Response, Router } from "express";

import LoginController from "../../controllers/auth/LoginController";
import LogoutController from "../../controllers/auth/LogoutController";




const router = Router();


   const logoutUserRoute  =  new LogoutController() ;

router.post("/logout", (req:Request,res:Response) => {
        console.log("Logout req" , req.body)
    logoutUserRoute.execute(req,res)    
});

export default router