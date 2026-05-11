import OrderRepo from "../../repo/OrderRepo/OrderRepo";




export default class GetOrderUseCase 
{
     
      private _getorderusecase!:OrderRepo

      constructor(getOrderUseCase:OrderRepo)
      {
          this._getorderusecase = getOrderUseCase ;
      }

           async execute():Promise<any>
           {

                 try {
                    
                 } catch (error) {
                    console.log(error)
                 }
           }
}