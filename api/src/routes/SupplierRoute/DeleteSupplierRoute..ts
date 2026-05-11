import { Request, Response, Router } from "express";
import DeleteSupplierController from "../../controllers/Supplier/DeleteSupplierController";
import { verifyToken } from "../../middleware/verifyToken";




const router = Router();


const DeleteSupplierRoute  =  new DeleteSupplierController()




router.delete("/delete/supplier/:id",verifyToken,(req:Request,res:Response) => {
   
    DeleteSupplierRoute.execute(req,res)
})



export default router