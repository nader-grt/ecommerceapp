import { Request, Response, Router } from "express";
import CreateDelivererDayWorkController from "../../controllers/DelivererDayWork/CreateDelivererDayWorkController";
import { verifyToken } from "../../middleware/verifyToken";

const router =Router() ;
const  createDelivererDayWorkRoute =  new  CreateDelivererDayWorkController()


router.post("/createdays/deliverers/:delivererid/day-works",verifyToken,(req:Request,res:Response)=> {
    //  console.log(" day deleveryyyyyyyyyyyy  ",req  )

    createDelivererDayWorkRoute.execute(req,res) ;
})

export default router