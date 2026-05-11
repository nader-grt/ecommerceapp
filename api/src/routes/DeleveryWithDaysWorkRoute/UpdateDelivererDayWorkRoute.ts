import { Request, Response, Router } from "express";
import { verifyToken } from "../../middleware/verifyToken";
import UpdateDelivererDayWorkController from "../../controllers/DelivererDayWork/UpdateDelivererDayWorkController";



const router = Router() ;
const updateDelivererDayWorkRoute = new UpdateDelivererDayWorkController() ;
//oldDayWorkId
router.put("/updateDay/deliverers/:delivererid/day-works/:oldDayWorkid",verifyToken,(req:Request,res:Response)=> {
    updateDelivererDayWorkRoute.execute(req,res) ;
});

export default router