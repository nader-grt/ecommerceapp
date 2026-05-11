import { Request, Response, Router } from "express";

import CreateDelevryController from "../../controllers/DelevryPerson/CreateDelevryPersonController";
import DeleteDelevryController from "../../controllers/DelevryPerson/DeleteDelevryPersonController";
import { verifyToken } from "../../middleware/verifyToken";

const router = Router();

const deleteDelevryRoute = new DeleteDelevryController();

router.delete(
  "/delete/delevry/:id",
  verifyToken,
  (req: Request, res: Response) => {
    console.log("/delete/delevry");
    deleteDelevryRoute.execute(req, res);
  }
);

export default router;
