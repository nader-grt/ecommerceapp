import { Request, Response, Router } from "express";

import CreateDelevryController from "../../controllers/DelevryPerson/CreateDelevryPersonController";
import { verifyToken } from "../../middleware/verifyToken";
import DeleveryRepo from "../../repo/delevryPersonRepo/DeleveryPersonRepo";
import { userRepo } from "../../repo/auth/userRepo/userRepo";
import CreateDelevryUseCase from "../../useCases/DelevryUseCase/CreateDelevryPersonUseCase";

const router = Router();
/**
 * 
 * 

 */
const deleveryusecaseRepo = new DeleveryRepo();

const userUsecaseRepo = new userRepo();

const createDelevryUseCase = new CreateDelevryUseCase(
  deleveryusecaseRepo,
  userUsecaseRepo
);
const createDelevryRoute = new CreateDelevryController(createDelevryUseCase);

router.post("/create/delevry", verifyToken, (req: Request, res: Response) => {
  createDelevryRoute.execute(req, res);
});

export default router;
