import { Request, Response } from "express"
import { BaseController } from "../../infra/BaseCOntroller"
import { RequestAuth } from "../../middleware/verifyToken";
import GetEmployeeUseCase from "../../useCases/EmployeeUseCase/GetEmployeeUseCase";



export default class GetEmployeeController extends BaseController
{
               
                  private ResponseEmp(emp:any)
                  {
                    return {
                      salary:emp.salary ,
            hiredAt: emp.hiredAt
                    }
                  }
          private usecase!:GetEmployeeUseCase ;
                  constructor(getEmployeeUseCase:GetEmployeeUseCase)
                  {
                    super() ;
                 
                    this.usecase = getEmployeeUseCase ;
                  }

      public async executeImpl(req: RequestAuth, res: Response): Promise<any> {
          
        const {id} = req.params ;
        const employeeId:number = Number(id) ;
        const userId :number = Number(req.user?.id )

  

     
         let empfound :any ;

               try {
                const dtoemp = {
                  employeeId,
                  userId
                }
                     
                           const resultEmp =              await this.usecase.execute(dtoemp)

                         // console.log("resultttt  ",resultEmp)
      

                           const emp = this.ResponseEmp(resultEmp.data) 
        
                           if(!resultEmp.success)
                           {
                            return this.resultValue(res,resultEmp.data) ;
                           }

                return this.resultValue(res,"employe with success ",emp) ;

               } catch (error) {
                console.log(error)
               }
      }

}