import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import UpdateUserProfileUseCase from "../../useCases/userUseCase/UpdateUserProfileUseCase";



export default class updateProfileUserController extends BaseController
{
                  private  _updateUserProfileUseCase!:UpdateUserProfileUseCase
                constructor(updateUserProfileUseCase:UpdateUserProfileUseCase)
                {super()
                 
                  this._updateUserProfileUseCase = updateUserProfileUseCase
                }
         protected async executeImpl(req: Request, res: Response): Promise<any> {
             

                               try {
                                
                               } catch (error) {
                                  console.log(error)
                               }
         }
}