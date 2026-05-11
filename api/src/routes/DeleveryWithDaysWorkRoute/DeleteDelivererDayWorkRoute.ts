import { Request, Response, Router } from "express";

import DeleteDelivererDayWorkController from "../../controllers/DelivererDayWork/DeleteDelivererDayWorkController";
import { verifyToken } from "../../middleware/verifyToken";



const router =Router() ;
const deleteDelivererDayWorkRoute= new DeleteDelivererDayWorkController()

router.delete("/deleteday/deliverers/:delivererid/day-works/:dayWorkid",verifyToken,(req:Request,res:Response) => {

    deleteDelivererDayWorkRoute.execute(req,res) ;
})


export default router