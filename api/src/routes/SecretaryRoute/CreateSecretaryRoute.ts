import { Request, Response, Router } from "express";
import CreateSecretaryController from "../../controllers/Secretary/CreateSecretaryController";
import { verifyToken } from "../../middleware/verifyToken";


const router = Router()


   const createSecretaryRoute = new CreateSecretaryController()







   router.post("/create/secretary",verifyToken,(req:Request,res:Response) => {
   
    createSecretaryRoute.execute(req,res)
})

export default router 