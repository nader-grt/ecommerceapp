import { Request, Response, Router } from "express";
import OrderRepo from "../../repo/OrderRepo/OrderRepo";
import GetOrderUseCase from "../../useCases/OrderUsecase/GetOrderUseCase";
import GetOrderController from "../../controllers/Orders/GetOrderController";
import { verifyToken } from "../../middleware/verifyToken";



const router = Router() ;

const orderepo = new OrderRepo() ;
const getOrderUseCase = new GetOrderUseCase(orderepo)
const getOrderRoute = new GetOrderController(getOrderUseCase) ;

router.get("/get/order",verifyToken,(req:Request,res:Response) => {

    getOrderRoute.execute(req,res) ;
})

export default router ;