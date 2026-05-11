import OrderDomain from "../../models/domain/OrderDomain/OrderDomain";



export default abstract class IOrderRepo {

    protected abstract CreateOrderByAdmin(order:OrderDomain):Promise<any> ;
    protected abstract DeleteOrderByIdAdmin(orderId:number):Promise<any> ;
    protected abstract FindOrderById(orderId:number) :Promise<any> ;
    protected abstract GetOrderById(orderId:number) :Promise<any> ;

    protected abstract UpdateOrderByAdminId(order:OrderDomain,orderId:number) :Promise<any> ;
    protected abstract CancelOrderByOrderIdWithUser(orderId:number,status:string):Promise<any> ;
    protected abstract PayOrderByOrderByUser(data:any):Promise<any> ;
    protected abstract ShipOrderByOrderByAdmin(data:any):Promise<any> ;
}