import { Request, Response, Router } from "express";
import CreateDayWorkController from "../../controllers/DayWorkName/CreateDayWorkController";
import { verifyToken } from "../../middleware/verifyToken";
import DayWorkRepo from "../../repo/dayWorkRepo/DayWorkRepo";
import CreateDayWorkUseCase from "../../useCases/DayWorkNameUseCase/CreateDayWorkUseCase";


const repo = new DayWorkRepo();
const createDayWorkUseCase = new CreateDayWorkUseCase(repo);
const createWorkDayRoute = new CreateDayWorkController(createDayWorkUseCase);



const route = Router()


route.post("/days",verifyToken,(req:Request,res:Response) => {

    createWorkDayRoute.execute(req,res)  ;
})



export default route