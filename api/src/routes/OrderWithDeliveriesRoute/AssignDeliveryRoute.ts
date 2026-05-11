import { Request, Response, Router } from "express";
import OrderWithDeliverieRepo from "../../repo/OrderWithDeliverieRepo/OrderWithDeliverieRepo";
import AssignDeliveryUseCase from "../../useCases/OrderWithDeliveriesUseCase/AssignDeliveryUseCase";
import AssignDeliveryController from "../../controllers/OrderWithDeliveries/AssignDeliveryController";
import { verifyToken } from "../../middleware/verifyToken";
import OrderRepo from "../../repo/OrderRepo/OrderRepo";
import DeleveryPersonRepo from "../../repo/delevryPersonRepo/DeleveryPersonRepo";

const router = Router()
const  order = new OrderRepo()
const DeleverierPerson = new DeleveryPersonRepo()
const orderWithDeliverieRepo        = new OrderWithDeliverieRepo() ;
const assignDeliveryUseCase  = new AssignDeliveryUseCase(orderWithDeliverieRepo,DeleverierPerson,order)
const assignDeliveryRoute =   new AssignDeliveryController(assignDeliveryUseCase)

router.patch("/admin/deliveries/:orderdeliveryId/assign",verifyToken,(req:Request,res:Response) => {
//deliveryPersonId
  assignDeliveryRoute.execute(req,res) ;
})

export default router