import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import ShipOrderUseCase from "../../useCases/OrderUsecase/ShipOrderUseCase";
import { RequestAuth } from "../../middleware/verifyToken";




export default class ShipOrderController extends BaseController
{
               private _shipOrderUseCase!:ShipOrderUseCase
          constructor(shipOrderUseCase:ShipOrderUseCase)
          {super()

            this._shipOrderUseCase = shipOrderUseCase ;
          }
      protected async executeImpl(req: RequestAuth, res: Response): Promise<any> {
                          
                     const {orderId}  = req.params
                        
                             try {
                              const actor = {
                                ownerId: req.user!.id,
                                ownerRole: req.user!.role,
                              };
                         
          
                              const dto = {
                                orderId:Number(orderId),
                                actor,
                              }


                         const result =          await this._shipOrderUseCase.execute(dto)
                                   if(!result.success)
                                    {
                                      return this.fail(res,"faild")
                                    }
            
                                    return this.ok(res,"shipped with success ")
                                  
                            } catch (error) {
                              console.log(error)
                             }
                 
      }
}