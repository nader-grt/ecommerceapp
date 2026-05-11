import { Request, Response, Router } from "express";
import OrderRepo from "../../repo/OrderRepo/OrderRepo";

import { verifyToken } from "../../middleware/verifyToken";
import { userRepo } from "../../repo/auth/userRepo/userRepo";
import CreateOrderByUserUseCase from "../../useCases/OrderUsecase/CreateOrderByUserUseCase";
import CreateOrderByUserController from "../../controllers/Orders/CreateOrderByUserController";
import ProductRepo from "../../repo/productRepo/productRepo";

const router = Router();

const userepo = new userRepo();
const orderepo = new OrderRepo();
const productrepo = new ProductRepo();
const createOrderUseCase = new CreateOrderByUserUseCase(orderepo, userepo,productrepo);

const createOrderRoute = new CreateOrderByUserController(createOrderUseCase);

// custmer

router.post("/me/orders", verifyToken, (req: Request, res: Response) => {
  createOrderRoute.execute(req, res);
});

export default router;
