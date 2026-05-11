import { Request, Response, Router } from "express";
import OrderWithDeliverieRepo from "../../repo/OrderWithDeliverieRepo/OrderWithDeliverieRepo";
import { verifyToken } from "../../middleware/verifyToken";
import CancelDeliveryOrderUseCase from "../../useCases/OrderWithDeliveriesUseCase/CancelDeliveryOrderUseCase";
import CancelDeliveryOrderController from "../../controllers/OrderWithDeliveries/CancelDeliveryOrderController";

const router = Router()

const orderWithDeliverieRepo        = new OrderWithDeliverieRepo() ;

const cancelDeliveryOrderUseCase  = new CancelDeliveryOrderUseCase(orderWithDeliverieRepo)

  const CancelDeliveryOrderRoute     =  new CancelDeliveryOrderController(cancelDeliveryOrderUseCase)



//
router.patch("/admin/deliveries/:deliveryId/cancel",verifyToken,(req:Request,res:Response) => {

    CancelDeliveryOrderRoute.execute(req,res) ;
  })

export default router 