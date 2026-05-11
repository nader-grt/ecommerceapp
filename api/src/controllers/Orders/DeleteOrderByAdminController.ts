import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import { RequestAuth } from "../../middleware/verifyToken";
import DeleteOrderByAdminUseCase from "../../useCases/OrderUsecase/DeleteOrderByAdminUseCase";


export default class DeleteOrderByAdminController  extends BaseController
{
         private  _deleteOrderByAdminUseCase!:DeleteOrderByAdminUseCase
         constructor(deleteOrderByAdminUseCase:DeleteOrderByAdminUseCase)
         {super()
         this._deleteOrderByAdminUseCase = deleteOrderByAdminUseCase ;
          
         }

       protected  async  executeImpl(req: RequestAuth, res: Response): Promise<any> {
                  const {id} = req.params ;


                  const orderId  =  Number(id)



                  console.log("admin ",  orderId)

                  const actor = {
                    ownerId: req.user!.id,
                    ownerRole: req.user!.role
               };

               const customerorderId = req.params.id
                    ? orderId
                    : actor.ownerId;

                try {
                  const dto = {
                    customerorderId:Number(customerorderId),
                    actor
               }


                   const result =     await this._deleteOrderByAdminUseCase.execute(dto) ;

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