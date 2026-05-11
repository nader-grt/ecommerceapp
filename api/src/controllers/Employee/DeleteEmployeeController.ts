import { Request, Response } from "express"
import { BaseController } from "../../infra/BaseCOntroller"
import EmployeeRepo from "../../repo/employeeRepo/EmployeeRepo";
import { RequestAuth } from "../../middleware/verifyToken";
import DeleteEmployeeUseCase from "../../useCases/EmployeeUseCase/DeleteEmployeeUseCase";



export default class DeleteEmployeeController extends BaseController
{
    protected _employeeRepo:EmployeeRepo ;

    private usecase!:DeleteEmployeeUseCase
          constructor(deleteEmployeeUseCase:DeleteEmployeeUseCase)
          {
            super();
             this._employeeRepo = new EmployeeRepo() ;

             this.usecase = deleteEmployeeUseCase ;
          }


      public async executeImpl(req: RequestAuth, res: Response): Promise<any> {
          

        const {id}  = req.params;
        const empId = Number(id) ;
        const userId :number = Number(req.user?.id)
  
        try {
            
            const result =      await this.usecase.execute({empId ,userId})
            
            if(result.success)
            {

              return this.ok(res," employee deleted with success !")
            }

            return this.fail(res," failed ")
        } catch (error) {
            console.log(error)
        }
      }

}