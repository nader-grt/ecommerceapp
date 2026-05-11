import    express, { Request, Response, Router } from "express";
import mailUserController from "../../controllers/mailUser/sendEmailUserController";



const router = Router();


const  userMailController = new mailUserController()  ;

router.post("/sendmail",  (req:Request,res:Response)  => {


    userMailController.execute(req,res)

})


export default router