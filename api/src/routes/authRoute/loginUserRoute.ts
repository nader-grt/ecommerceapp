


import { Request, Response, Router } from "express";

import LoginController from "../../controllers/auth/LoginController";
import { verifyToken } from "../../middleware/verifyToken";
import { userRepo } from "../../repo/auth/userRepo/userRepo";
import LoginUseCase from "../../useCases/Auth/LoginUseCase";


const   loginUserrepo = new userRepo();
 const loginUserUseCase  = new LoginUseCase(loginUserrepo)

const loginRoute  =  new LoginController(loginUserUseCase) ;


const router = Router();


 //verifyToken

   router.post("/login",(req:Request,res:Response) => {
    console.log("llllllllllllllllllllllll step 1 ")
    loginRoute.execute(req,res)    
});

export default router