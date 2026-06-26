import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import GetProfileUserUseCase from "../../useCases/userUseCase/GetProfileUserUseCase";
import { RequestAuth } from "../../middleware/verifyToken";



//GetUserController
export default class GetProfileUserController extends BaseController
{




            private  _getProfileUser!:GetProfileUserUseCase
               constructor(getProfileUserUseCase:GetProfileUserUseCase)
               {super()

                    this._getProfileUser = getProfileUserUseCase
               }
       protected async executeImpl(req: RequestAuth, res: Response): Promise<any> {
           


                    console.log("uuuuuuuuuuuuuuuuuuuuu  ",req.user)
              const userId = Number(req.user!.id);


              const result = await this._getProfileUser.execute(userId);
          

              try {
              if (!result.success) {


                return this.fail(res, result.message);
              }
          
          //    return this.ok(res,"her ")
              return this.resultValue(res, "profile  with success ", {
              //  id : result.user.id,
                firstName: result.user.firstName,
                lastName: result.user.lastName,
                email: result.user.email,
                phone: result.user.phone,
              });
            } catch (err:any) {
              return this.fail(res, "unexpected error here error ");
            }
       }
}