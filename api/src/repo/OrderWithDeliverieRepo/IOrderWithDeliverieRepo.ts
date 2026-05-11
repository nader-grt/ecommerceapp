

export default abstract class IOrderWithDeliverieRepo {

  protected abstract CreateOrderWithDeliverInit(OrderWithDeliver:any,t:any,deliveryPersonId?:number):Promise<any>;

  protected abstract FindOrderWithDeliver(orderIdDeliverer?:number):Promise<any>;
  protected abstract AssignOrderToDelivrerPerson(data:any):Promise<any>;
  

    
}