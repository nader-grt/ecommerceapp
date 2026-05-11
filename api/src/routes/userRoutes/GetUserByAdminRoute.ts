import { Request, Response, Router } from "express";

import { verifyToken } from "../../middleware/verifyToken";

import { UserControllerFactory } from "../../FactoryUsers/FactroryUser";

const router = Router();



router.get("/users/:id", verifyToken, (req: Request, res: Response) => {
  console.log("step 1 factory ")
  UserControllerFactory.GetUserByAdminController().execute(req, res);
});

export default router;
