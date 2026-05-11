import { Request, Response } from "express"
import { BaseController } from "../../infra/BaseCOntroller"
import { RequestAuth } from "../../middleware/verifyToken"
import EmployeeRepo from "../../repo/employeeRepo/EmployeeRepo"
import EmployeesDomain from "../../models/domain/EmployeeDomain/EmployeeDomain";
import { stringToDate } from "../../util/conversionDateString";
import UpdateEmployeeUseCase from "../../useCases/EmployeeUseCase/UpdateEmployeeUseCase";



export default class UpdateEmployeeController extends BaseController
{
             protected _employeeRepo:EmployeeRepo ;
             protected _employeesDomain:EmployeesDomain;

            private usecase!:UpdateEmployeeUseCase
       constructor(updateEmployeeUseCase:UpdateEmployeeUseCase)
       {
        super() 
        this._employeeRepo  = new EmployeeRepo()
         this._employeesDomain = new EmployeesDomain();

         this.usecase = updateEmployeeUseCase
       }

      public async executeImpl(req: RequestAuth, res: Response): Promise<any> {
        const {salary ,hiredAt ,employeeId} =
        req.body;
        const {id}  = req.params;
        const empId = Number(employeeId) ;
        let employeeFounded: EmployeesDomain | null = null;
              


       
        try {


          const empDto = {
            
              salary,
              hiredAt,
              employeeId
  

          }
          
                  const result =            await this.usecase.execute(empDto)
                
                  console.log("rrrrrrrrrrrrr  ",result)
              
           
             if(result.succes)
             {

          
               return this.resultValue(res," employee updated with success !",result)
            }

            return this.fail(res,result.message)

        } catch (error) {
            console.log(error)
        }
      }

}