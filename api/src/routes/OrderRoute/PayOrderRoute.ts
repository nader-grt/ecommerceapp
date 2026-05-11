
import { Request, Response, Router } from "express";
import { verifyToken } from "../../middleware/verifyToken";
import { userRepo } from "../../repo/auth/userRepo/userRepo";
import OrderRepo from "../../repo/OrderRepo/OrderRepo";
import PayOrderUseCase from "../../useCases/OrderUsecase/PayOrderUseCase";
import PayOrderController from "../../controllers/Orders/PayOrderController";




const router = Router()



const userepo = new userRepo();
const orderepo = new OrderRepo();
const  payOrderUseCase   = new PayOrderUseCase(userepo,orderepo)
const payOrderRoute= new PayOrderController(payOrderUseCase) 


 router.post("/orders/:orderId/pay", verifyToken, (req: Request, res: Response) => {
        payOrderRoute.execute(req, res);
      });

export default router 