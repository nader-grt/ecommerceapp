import { Request, Response, Router } from "express";
import GetSupplierController from "../../controllers/Supplier/GetSupplierController";
import { verifyToken } from "../../middleware/verifyToken";



const router = Router();


const GetSupplierRoute  =  new GetSupplierController()





router.get("/get/supplier",verifyToken,(req:Request,res:Response) => {
   
    GetSupplierRoute.execute(req,res)
})



export default router