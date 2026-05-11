import { Request, Response, Router } from "express";

import { verifyToken } from "../../middleware/verifyToken";
import GetDayWorkController from "../../controllers/DayWorkName/GetDayWorkController";
import DayWorkRepo from "../../repo/dayWorkRepo/DayWorkRepo";
import GetDayWorkUseCase from "../../useCases/DayWorkNameUseCase/GetDayWorkUseCase";

const router = Router();

// Composition Root
const repo = new DayWorkRepo();
const getDayWorkUseCase = new GetDayWorkUseCase(repo);

const getWorkDayRoute = new GetDayWorkController(getDayWorkUseCase);

router.get("/days", verifyToken, (req: Request, res: Response) => {
  getWorkDayRoute.execute(req, res);
});

export default router;
