import { Request, Response, Router } from "express";
import OrderRepo from "../../repo/OrderRepo/OrderRepo";
import CreateOrderUseCase from "../../useCases/OrderUsecase/CreateOrderByUserUseCase";
import CreateOrderController from "../../controllers/Orders/CreateOrderByUserController";
import { verifyToken } from "../../middleware/verifyToken";
import { userRepo } from "../../repo/auth/userRepo/userRepo";
import CreateOrderByAdminController from "../../controllers/Orders/CreateOrderByAdminController";
import CreateOrderByAdminUseCase from "../../useCases/OrderUsecase/CreateOrderByAdminUseCase";
import ProductRepo from "../../repo/productRepo/productRepo";

const router = Router();

const userepo = new userRepo();
const orderepo = new OrderRepo();
const productrepo = new ProductRepo();
const createOrderUseCase = new CreateOrderByAdminUseCase(
  userepo,
  orderepo,
  productrepo
);

const createOrderByAdminRoute = new CreateOrderByAdminController(
  createOrderUseCase
);

// admin

router.post(
  "/customers/:id/orders",
  verifyToken,
  (req: Request, res: Response) => {
    createOrderByAdminRoute.execute(req, res);
  }
);

export default router;
