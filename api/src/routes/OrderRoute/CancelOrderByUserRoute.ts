import { Request, Response, Router } from "express";
import { userRepo } from "../../repo/auth/userRepo/userRepo";
import OrderRepo from "../../repo/OrderRepo/OrderRepo";
import CancelOrderByUserUseCase from "../../useCases/OrderUsecase/CancelOrderByUserUseCase";
import CancelOrderByUserController from "../../controllers/Orders/CancelOrderByUserController";
import { verifyToken } from "../../middleware/verifyToken";




const router = Router()



const userepo = new userRepo();
const orderepo = new OrderRepo();

const  cancelOrderByUserUseCase = new CancelOrderByUserUseCase(orderepo,userepo)
  const cancelOrderByUserRoute             =     new CancelOrderByUserController(cancelOrderByUserUseCase)  

  router.delete("/order/:orderId/cancel", verifyToken, (req: Request, res: Response) => {
    cancelOrderByUserRoute.execute(req, res);
  });


export default router 