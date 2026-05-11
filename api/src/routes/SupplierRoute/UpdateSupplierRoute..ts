import { Request, Response, Router } from "express";


import UpdateSupplierController from "../../controllers/Supplier/UpdateSupplierController";
import { verifyToken } from "../../middleware/verifyToken";

const router = Router();


const UpdateSupplierRoute  =  new UpdateSupplierController()





router.put("/update/supplier",verifyToken,(req:Request,res:Response) => {
   
    UpdateSupplierRoute.execute(req,res)
})



export default router