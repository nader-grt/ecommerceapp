import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import { RequestAuth } from "../../middleware/verifyToken";
import CreateOrderByAdminUseCase from "../../useCases/OrderUsecase/CreateOrderByAdminUseCase";

export  default class CreateOrderByAdminController  extends BaseController
{

           private _createOrderByAdminUseCase!:CreateOrderByAdminUseCase
          constructor(createOrderByAdminUseCase:CreateOrderByAdminUseCase)
          {super()
           this._createOrderByAdminUseCase = createOrderByAdminUseCase
          }
     protected async executeImpl(req: RequestAuth, res: Response): Promise<any> {
         
                const  { id}  =  req.params  ;  
                 const {items}  =  req.body
                const userId  =  Number(id)



                   console.log("admin ",items , userId)

                   const actor = {
                     ownerId: req.user!.id,
                     ownerRole: req.user!.role
                };

                const customerId = req.params.id
                     ? userId
                     : actor.ownerId;
                 try {
                  const dto = {
                     custmerId:Number(customerId),
                     items,
                     actor
                }

                    const result =        await this._createOrderByAdminUseCase.execute(dto)

                    if(!result.success)
                    {
                       return this.fail(res,result.message)
                    }

                    return this.ok(res,result.message)
                 } catch (error) {
                    console.log(error)
                 }
     }
}