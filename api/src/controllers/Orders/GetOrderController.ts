import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import GetOrderUseCase from "../../useCases/OrderUsecase/GetOrderUseCase";




export default class GetOrderController extends BaseController
{

    private _getOrderUseCase!:GetOrderUseCase
    constructor(getOrderUseCase:GetOrderUseCase)
    {super() ;

        this._getOrderUseCase = getOrderUseCase ;
    } 


         protected async executeImpl(req: Request, res: Response): Promise<any> {
                           
                       try {
                        
                       } catch (error) {
                          console.log(error)
                       }
         }
}