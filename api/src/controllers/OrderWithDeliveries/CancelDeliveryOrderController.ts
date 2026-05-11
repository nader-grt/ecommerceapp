import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import CancelDeliveryOrderUseCase from "../../useCases/OrderWithDeliveriesUseCase/CancelDeliveryOrderUseCase";




export default class CancelDeliveryOrderController extends BaseController
{
             private _cancelDeliveryOrderUseCase!:CancelDeliveryOrderUseCase ;

             constructor(cancelDeliveryOrderUseCase:CancelDeliveryOrderUseCase)
             {super()
              this._cancelDeliveryOrderUseCase =cancelDeliveryOrderUseCase

             }
      protected  async executeImpl(req: Request, res: Response): Promise<any> {
          
        const { deliveryId } = req.params;

                   try {
                    
                   } catch (error) {
                    console.log(error)
                   }
      }
}