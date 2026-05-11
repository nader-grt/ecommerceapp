import { Request, Response, Router } from "express";
import GetSecretaryController from "../../controllers/Secretary/GetSecretaryController";
import { verifyToken } from "../../middleware/verifyToken";


const router = Router()


   const getSecretaryRoute = new GetSecretaryController


   router.get("/get/secretary/:id" ,verifyToken, (req:Request,res:Response) => {
  
    getSecretaryRoute.execute(req,res)  ;
   })

export default router 