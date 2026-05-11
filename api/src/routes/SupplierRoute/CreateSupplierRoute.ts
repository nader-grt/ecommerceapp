import { Request, Response, Router } from "express";


import CreateSupplierController from "../../controllers/Supplier/CreateSupplierController";
import { verifyToken } from "../../middleware/verifyToken";

const router = Router();


const createSupplierRoute  =  new CreateSupplierController()





router.post("/create/supplier",verifyToken,(req:Request,res:Response) => {
   
    createSupplierRoute.execute(req,res)
})
//supplier


export default router