import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import { RequestAuth } from "../../middleware/verifyToken";
import StartDeliveryOrderUseCase from "../../useCases/OrderWithDeliveriesUseCase/StartDeliveryOrderUseCase";




export default class StartDeliveryOrderController extends BaseController
{

                  private _startDeliveryOrderUseCase!:StartDeliveryOrderUseCase
                   constructor(startDeliveryOrderUseCase:StartDeliveryOrderUseCase)
                   {
                    super() ;
                    this._startDeliveryOrderUseCase = startDeliveryOrderUseCase
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