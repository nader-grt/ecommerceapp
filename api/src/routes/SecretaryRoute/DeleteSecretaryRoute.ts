import { Request, Response, Router } from "express";
import DeleteSecretaryController from "../../controllers/Secretary/DeleteSecretaryController";
import { verifyToken } from "../../middleware/verifyToken";


const router = Router()


   const deleteSecretaryRoute = new DeleteSecretaryController


   router.delete("/delete/secretary" ,verifyToken, (req:Request,res:Response) => {
  
    deleteSecretaryRoute.execute(req,res)  ;
   })

export default router 