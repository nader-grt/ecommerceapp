

export default abstract class IDeleveryWithDaysWorkRepo
{
    protected abstract CreateDeleveryWithDaysWork(DeleveryDay :any ,deleveryId?:number):Promise<any>;
    protected abstract GetDeliveryInfo():Promise<any> ;
    protected abstract UpdateDeleveryWithDaysWork(updatedeliveryDay :any ,deliveryid :number,olddayworkid:number):Promise<any>;
    protected abstract DeleteDeleveryWithDaysWork(deliveryid :number,olddayworkid:number):Promise<any>;

    protected abstract GetDeliveryBydeleveryId_dayworkId(id:number):Promise<any> ;
}