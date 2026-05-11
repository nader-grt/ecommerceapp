import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import { RequestAuth } from "../../middleware/verifyToken";
import CompleteDeliveryOrderUseCase from "../../useCases/OrderWithDeliveriesUseCase/CompleteDeliveryOrderUseCase";




export default class CompleteDeliveryOrderController extends BaseController
{
               private _completeDeliveryOrderUseCase!:CompleteDeliveryOrderUseCase

               constructor(completeDeliveryOrderUseCase:CompleteDeliveryOrderUseCase)
               {super()

                this._completeDeliveryOrderUseCase =completeDeliveryOrderUseCase
               }

      protected  async executeImpl(req: RequestAuth, res: Response): Promise<any> {
        const { deliveryId } = req.params;
        const delivererId = req.user?.id; 


                         try {
                          
                         } catch (error) {
                          console.log(error)
                         }
      }
}