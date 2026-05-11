import { Request, Response, Router } from "express";

import { verifyToken } from "../../middleware/verifyToken";
import { UserControllerFactory } from "../../FactoryUsers/FactroryUser";




const router = Router();

router.get("/me", verifyToken, (req: Request, res: Response) => {
    UserControllerFactory.GetProfileController().execute(req, res);
  });


  export default router;


