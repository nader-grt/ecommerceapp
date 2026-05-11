import { Request, Response, Router } from "express";
import { verifyToken } from "../../middleware/verifyToken";
import UpdateEmployeeController from "../../controllers/Employee/UpdateEmployeeController";
import EmployeeRepo from "../../repo/employeeRepo/EmployeeRepo";
import UpdateEmployeeUseCase from "../../useCases/EmployeeUseCase/UpdateEmployeeUseCase";




const router = Router();



const empRepo = new EmployeeRepo()  ;

const updateCategoryUseCase = new UpdateEmployeeUseCase(empRepo)

const updateEmployeeController  =  new UpdateEmployeeController(updateCategoryUseCase)





router.put("/update/employee",verifyToken,(req:Request,res:Response) => {
   
    updateEmployeeController.execute(req,res)
})



export default router