import { Request, Response, Router } from "express";
import GetDelivererDayWorkController from "../../controllers/DelivererDayWork/GetDelivererDayWorkController";
import { verifyToken } from "../../middleware/verifyToken";



const router = Router() ;
const getDelivererDayWorkRoute = new GetDelivererDayWorkController() ;

router.get("/getDay/deliverers/:delivererid/day-works",verifyToken,(req:Request,res:Response)=> {
    getDelivererDayWorkRoute.execute(req,res) ;
})

export default router