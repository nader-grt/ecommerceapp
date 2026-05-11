import { Request, Response, Router } from "express";
import OrderRepo from "../../repo/OrderRepo/OrderRepo";
import UpdateOrderUseCase from "../../useCases/OrderUsecase/UpdateOrderUseCase";
import UpdateOrderController from "../../controllers/Orders/UpdateOrderController";
import { verifyToken } from "../../middleware/verifyToken";



const router = Router() ;

const orderepo = new OrderRepo() ;
const updateOrderUseCase = new UpdateOrderUseCase(orderepo)  ;
const updateorderRoute = new UpdateOrderController(updateOrderUseCase) ;

router.put("/update",verifyToken,(req:Request,res:Response) => {

    updateorderRoute.execute(req,res) ;
})



export default router ;