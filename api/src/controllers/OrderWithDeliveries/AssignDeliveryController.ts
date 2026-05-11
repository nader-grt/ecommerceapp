import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import AssignDeliveryUseCase from "../../useCases/OrderWithDeliveriesUseCase/AssignDeliveryUseCase";
import { RequestAuth } from "../../middleware/verifyToken";




export default class AssignDeliveryController extends BaseController
{
                  private _assignDeliveryUseCase!:AssignDeliveryUseCase;
                  constructor(assignDeliveryUseCase:AssignDeliveryUseCase)
                  {super()

                        this._assignDeliveryUseCase = assignDeliveryUseCase ;
                  }
      protected  async executeImpl(req: RequestAuth, res: Response): Promise<any> {
                       
                        const { orderdeliveryId } = req.params;
                        const { deliveryPersonId } = req.body;

                        try {

                              const actor = {
                                    ownerId: req.user!.id,
                                    ownerRole: req.user!.role
                               };

                               const dto = {
                                    orderdeliveryId:Number(orderdeliveryId),   
                                    deliveryPersonId:Number(deliveryPersonId),
                                    actor
                               }
                              
                       const result =        await this._assignDeliveryUseCase.execute(dto) ;

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