
import { Request, Response, Router } from "express";
import { verifyToken } from "../../middleware/verifyToken";
import OrderRepo from "../../repo/OrderRepo/OrderRepo";
import ShipOrderUseCase from "../../useCases/OrderUsecase/ShipOrderUseCase";
import ShipOrderController from "../../controllers/Orders/ShipOrderController";




const router = Router()




const orderepo = new OrderRepo();

const  shipOrderUseCase = new   ShipOrderUseCase(orderepo)

const ShipOrderRoute    =  new ShipOrderController(shipOrderUseCase) 

router.post("/orders/:orderId/ship", verifyToken, (req: Request, res: Response) => {
    ShipOrderRoute.execute(req, res);
  });

export default router 