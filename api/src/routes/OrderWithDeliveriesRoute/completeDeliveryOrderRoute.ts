import { Request, Response, Router } from "express";
import OrderWithDeliverieRepo from "../../repo/OrderWithDeliverieRepo/OrderWithDeliverieRepo";
import { verifyToken } from "../../middleware/verifyToken";

import CompleteDeliveryOrderUseCase from "../../useCases/OrderWithDeliveriesUseCase/CompleteDeliveryOrderUseCase";
import CompleteDeliveryOrderController from "../../controllers/OrderWithDeliveries/CompleteDeliveryOrderController";

const router = Router()

const orderWithDeliverieRepo        = new OrderWithDeliverieRepo() ;
 const completeDeliveryOrderUseCase = new CompleteDeliveryOrderUseCase(orderWithDeliverieRepo)
       const    completeDeliveryOrderRoute =  new CompleteDeliveryOrderController(completeDeliveryOrderUseCase)  



       router.patch(" /deliverer/deliveries/:deliveryId/complete",verifyToken,(req:Request,res:Response) => {

        completeDeliveryOrderRoute.execute(req,res) ;
      })

export default router 