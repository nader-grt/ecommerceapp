import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import PayOrderUseCase from "../../useCases/OrderUsecase/PayOrderUseCase";
import { RequestAuth } from "../../middleware/verifyToken";


export default class PayOrderController extends BaseController
{


    private _payOrderUseCase!:PayOrderUseCase
         constructor(payOrderUseCase:PayOrderUseCase)
         {super()

            this._payOrderUseCase = payOrderUseCase ;
         }
     protected async executeImpl(req: RequestAuth, res: Response): Promise<any> {
                  const {orderId}  = req.params
                  const {paidAmount} = req.body
                  try {
                    
                    const actor = {
                      ownerId: req.user!.id,
                      ownerRole: req.user!.role,
                    };
                    console.log("pay",paidAmount)

                    const dto = {
                      paidAmount:Number(paidAmount),
                      orderId:Number(orderId),
                      actor,
                    }

                        const result =      await this._payOrderUseCase.execute(dto) ;
                        if(!result.success)
                        {
                          return this.fail(res,"faild")
                        }

                        return this.ok(res,"paid with success ")
                  } catch (error) {
                    console.log(error)
                  }
     }
}