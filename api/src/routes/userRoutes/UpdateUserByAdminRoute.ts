import { Request, Response, Router } from "express";
import { UserControllerFactory } from "../../FactoryUsers/FactroryUser";
import { verifyToken } from "../../middleware/verifyToken";




const router = Router();

router.put("/users/:id", verifyToken, (req: Request, res: Response) => {
    UserControllerFactory.UpdateUserByAdminrController().execute(req, res);
  });


  export default router;
