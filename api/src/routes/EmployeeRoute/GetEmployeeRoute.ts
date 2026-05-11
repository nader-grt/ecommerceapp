import { Request, Response, Router } from "express";
import { verifyToken } from "../../middleware/verifyToken";
import GetEmployeeController from "../../controllers/Employee/GetEmployeeController";
import EmployeeRepo from "../../repo/employeeRepo/EmployeeRepo";
import GetEmployeeUseCase from "../../useCases/EmployeeUseCase/GetEmployeeUseCase";




const router = Router();


const empRepo = new EmployeeRepo()

const getEmployeeUseCase = new GetEmployeeUseCase(empRepo)
const getEmployeeController  =  new GetEmployeeController(getEmployeeUseCase)





router.get("/get/employee/:id",verifyToken,(req:Request,res:Response) => {
   
    getEmployeeController.execute(req,res)
})



export default router