import { Request, Response, Router } from "express";
import OrderWithDeliverieRepo from "../../repo/OrderWithDeliverieRepo/OrderWithDeliverieRepo";
import { verifyToken } from "../../middleware/verifyToken";
import StartDeliveryOrderUseCase from "../../useCases/OrderWithDeliveriesUseCase/StartDeliveryOrderUseCase";
import StartDeliveryOrderController from "../../controllers/OrderWithDeliveries/StartDeliveryOrderController";

const router = Router()

const orderWithDeliverieRepo        = new OrderWithDeliverieRepo() ;
 const startDeliveryOrderUseCase = new StartDeliveryOrderUseCase(orderWithDeliverieRepo)
  const startDeliveryOrderRoute = new  StartDeliveryOrderController(startDeliveryOrderUseCase)


  router.patch("/deliverer/deliveries/:deliveryId/start",verifyToken,(req:Request,res:Response) => {

    startDeliveryOrderRoute.execute(req,res) ;
  })

export default router 