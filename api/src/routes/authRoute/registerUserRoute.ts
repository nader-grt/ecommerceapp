

import { Request, Response, Router } from "express";
import RegisterController from "../../controllers/auth/RegisterController";




const router = Router();


   const registerUserRoute  =  new RegisterController()


router.post("/register", (req:Request,res:Response) => {
    //    console.log("req \t **  " , req.body)
    registerUserRoute.execute(req,res)
})


export default router

