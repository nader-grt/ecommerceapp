import { Request, Response, Router } from "express";
import CreateSecretaryController from "../../controllers/Secretary/CreateSecretaryController";
import UpdateSecretaryController from "../../controllers/Secretary/UpdateSecretaryController";
import { verifyToken } from "../../middleware/verifyToken";


const router = Router()


   const updateSecretaryRoute = new UpdateSecretaryController


   router.put("/update/secretary" ,verifyToken, (req:Request,res:Response) => {
  
    updateSecretaryRoute.execute(req,res)  ;
   })

export default router 