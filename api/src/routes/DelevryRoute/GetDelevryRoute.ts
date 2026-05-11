import { Request, Response, Router } from "express";

import { verifyToken } from "../../middleware/verifyToken";
import GetDelevryController from "../../controllers/DelevryPerson/GetDelevryPersonController";

const router = Router();

const getDelevryRoute = new GetDelevryController();

// ca  we give a name  to function uploadMiddleware  using on postman
router.get("/get/delevry/:id", verifyToken, (req: Request, res: Response) => {
  console.log(" *************** get delevry");
  getDelevryRoute.execute(req, res);
});

export default router;
