import OrderWithDeliverieRepo from "../../repo/OrderWithDeliverieRepo/OrderWithDeliverieRepo"

export default class CompleteDeliveryOrderUseCase
{

    private _orderWithDeliverieRepo!:OrderWithDeliverieRepo
    constructor(orderWithDeliverieUseCaseRepo:OrderWithDeliverieRepo)
    {
           this._orderWithDeliverieRepo      = orderWithDeliverieUseCaseRepo
    }

               async execute():Promise<any>
               {

                   try {
                    
                   } catch (error) {
                    
                   }
               }
}