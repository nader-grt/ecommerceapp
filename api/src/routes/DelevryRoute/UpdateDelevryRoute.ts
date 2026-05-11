import { Request, Response, Router } from "express";

import UpdateDelevryController from "../../controllers/DelevryPerson/UpdateDelevryPersonController";
import { verifyToken } from "../../middleware/verifyToken";

const router = Router();

const updateDelevryRoute = new UpdateDelevryController();

router.put("/update/delevry", verifyToken, (req: Request, res: Response) => {
  console.log("   ///update/delevry");
  updateDelevryRoute.execute(req, res);
});

export default router;
