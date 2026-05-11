import { Request, Response, Router } from "express";
import OrderRepo from "../../repo/OrderRepo/OrderRepo";
import { verifyToken } from "../../middleware/verifyToken";
import DeleteOrderByAdminUseCase from "../../useCases/OrderUsecase/DeleteOrderByAdminUseCase";
import DeleteOrderByAdminController from "../../controllers/Orders/DeleteOrderByAdminController";

const router = Router();

const orderepo = new OrderRepo();

const deleteOrderUsecase = new DeleteOrderByAdminUseCase(orderepo);
const deleteOrderRoute = new DeleteOrderByAdminController(deleteOrderUsecase);

router.delete("/order/:id", verifyToken, (req: Request, res: Response) => {
  deleteOrderRoute.execute(req, res);
});

export default router;
