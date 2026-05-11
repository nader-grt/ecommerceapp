import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import GetAllUserUseCase from "../../useCases/userUseCase/GetAllUserUseCase";



export default class GetAllUserCOntroller extends BaseController
{

                private _getAllUserUseCase!:GetAllUserUseCase
               constructor(getAllUserUseCase:GetAllUserUseCase)
               {super()
           
                 this._getAllUserUseCase = getAllUserUseCase ;
               }

    protected async executeImpl(req: Request, res: Response): Promise<any> {
                   

                   try {
               

                      const resultListUsers =     await this._getAllUserUseCase.execute() ;

                    //  console.log("rr ",resultListUsers)
                          return this.resultValue(res,"list users  ",resultListUsers.user)
                   } catch (error) {
                     console.log(error)
                   }
    }
}