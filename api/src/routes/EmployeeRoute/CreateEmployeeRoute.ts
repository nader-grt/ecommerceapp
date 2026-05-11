import { Request, Response, Router } from "express";
import CreateEmployeeController from "../../controllers/Employee/CreateEmployeeController";
import { verifyToken } from "../../middleware/verifyToken";
import EmployeeRepo from "../../repo/employeeRepo/EmployeeRepo";
import CreateEmployeeUseCase from "../../useCases/EmployeeUseCase/CreateEmployeeUseCase";




const router = Router();



const empRepo = new EmployeeRepo() ;
const createEmployeeUseCase = new CreateEmployeeUseCase(empRepo)
const createEmployeeController  =  new CreateEmployeeController(createEmployeeUseCase)




// ca  we give a name  to function uploadMiddleware  using on postman 
router.post("/create/employee",verifyToken,(req:Request,res:Response) => {
   
    createEmployeeController.execute(req,res)
})



export default router