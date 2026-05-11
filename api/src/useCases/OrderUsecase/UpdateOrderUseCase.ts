import OrderRepo from "../../repo/OrderRepo/OrderRepo";




export default class UpdateOrderUseCase 
{


            private _updateorderusecase!:OrderRepo

            constructor(updateOrderUseCase:OrderRepo)
            {
               this._updateorderusecase = updateOrderUseCase ;
            }

            async execute():Promise<any>

             {
                             try {
                                
                             } catch (error) {
                                console.log(error)
                             }
             }


        }