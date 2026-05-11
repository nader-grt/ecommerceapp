import OrderWithDeliverieDomain from "../../models/domain/OrderWithDeliverieDomain/OrderWithDeliverieDomain";
import { Orderwithdeliverie, sequelize } from "../../models/main";
import { stringToDate } from "../../util/conversionDateString";
import IOrderWithDeliverieRepo from "./IOrderWithDeliverieRepo";

export default class OrderWithDeliverieRepo extends IOrderWithDeliverieRepo {

  public async CreateOrderWithDeliverInit(orderWithDeliver: any, t?: any): Promise<any> {
    let transaction = t;
    let localTransaction = false;

    try {


      console.log("orderWithDeliver  ",orderWithDeliver)

      if (!transaction) {
        transaction = await sequelize.transaction();
        localTransaction = true;
      }



      const mapperOrderWith:any = {
        orderId: orderWithDeliver.orderId,
        status: orderWithDeliver.status,
        pickedUpAt:new Date(),
        deliveredAt:new Date()
      };
   

      console.log("mapperOrderWith")

      const orderWithDel = await Orderwithdeliverie.create(mapperOrderWith, {
        transaction,
        raw: true
      });

   
      if (localTransaction) await transaction.commit();

      console.log("OrderWithDeliver created", orderWithDel);
      return orderWithDel;

   

    } catch (error) {
      if (localTransaction && transaction) await transaction.rollback();
      throw error; 
    }
  }


  public async FindOrderWithDeliver(orderIdDeliverer?:number):Promise<any>

  {           const t = await sequelize.transaction()
                 try {
                  
                                const orderWithDel = await Orderwithdeliverie.findByPk(orderIdDeliverer, 
                                  {transaction: t ,raw: true}
                                  
                                );
                           if(!orderWithDel) return null

                           return orderWithDel

                 } catch (error) {
                    console.log(error)
                 }
  }

  private async GetOrderWithDeliver(orderIdDeliverer?:number):Promise<OrderWithDeliverieDomain |any>

  {           const t = await sequelize.transaction()
                 try {
                  
                                const orderWithDel = await Orderwithdeliverie.findByPk(orderIdDeliverer, 
                                  {transaction: t ,raw: true}
                                  
                                );
                           if(!orderWithDel) return null

                           return OrderWithDeliverieDomain.reStoreOrBuildOrder( {
   
                            orderId: Number(orderWithDel.orderId),
                            status: orderWithDel.status,
                         
                            deliveryPersonId: orderWithDel.deliveryPersonId ?? undefined,
                           //  pickedUpAt:(orderWithDel.pickedUpAt),
                           //  deliveredAt: orderWithDel.deliveredAt,
                          }

                           )

                 } catch (error) {
                    console.log(error)
                 }
  }

   
  public async AssignOrderToDelivrerPerson(data:any):Promise<any>
  {                const t = await sequelize.transaction() ;

    const {
      orderdeliveryId,
     deliveryPersonId,
 
    }  = data



      
              try {

                const orderWithDelDomain :OrderWithDeliverieDomain = await this.GetOrderWithDeliver(orderdeliveryId );
           if(!orderWithDelDomain) return null
                




           orderWithDelDomain.assignDeliveryPerson(deliveryPersonId)
        


   


      
           const [affectedCount]=   await Orderwithdeliverie.update(
            { deliveryPersonId },
                        { 
                          where: { id: orderdeliveryId },
                          transaction: t 
                      }
                      );
                   

                    
                      if (affectedCount === 0) {
                        throw new Error("Update failed: No rows affected");
                    }
                  await t.commit();
                  return { success: true };
              }  catch (error:any) {
                await t.rollback();
                 return { success: false, message: error.message };
              }

  }
}