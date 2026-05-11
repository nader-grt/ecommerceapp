import {  DelivererDayWork, sequelize } from "../../models/main";

import IDelivererDayWork from "../../models/DelivererDayWork";
import IDeleveryWithDaysWorkRepo from "./IDeleveryWithDaysWorkRepo";
import { QueryTypes, Transaction } from "sequelize";




export default class DeleveryWithDaysWorkRepo extends IDeleveryWithDaysWorkRepo
{

    public async CreateDeleveryWithDaysWork(payload: IDelivererDayWork,deleveryId?:number):Promise<any>
    {
        const t = await sequelize.transaction();
           try {

         
            const payloadMapper = {
                delivererid: payload.delivererid,
                dayWorkid: payload.dayWorkid,
                nbrHours: payload.nbrHours,
              };  //nbrHours

            //   const {
            //     nbrHours,
            //     delivererid,
            //     dayWorkid,
            //   } = payload;
            const result = await DelivererDayWork.create(
                payloadMapper,
                { transaction: t }
              );
          
              await t.commit();
            
              return result.get({ plain: true }) ;;

           } catch (error) {
            await t.rollback()
              console.log(error)
           }
    }

    public static async FindDelivererDayWorkBefore(deliveryid?:number ,dayWorkid?:number):Promise<boolean | any>
    {
                 try {
                    const exists = await DelivererDayWork.findOne({
                        where: {
                            delivererid:deliveryid,
                          dayWorkid
                        },
                      });
                    return exists ? true :false
                 } catch (error) {
                    console.log(error)
                 }
                    
    }


    public  async GetDeliveryInfo(): Promise<any> {
        
                     try {
                        const result = await sequelize.query(
                            'SELECT * FROM vw_deliverer_dayworks',
                            { type: QueryTypes.SELECT }
                          );
                         console.log("view result   ",result)
                          return result
                     } catch (error) {
                         console.log(error)
                     }
    }


    public  async GetDeliveryAllInfo(): Promise<any> {
        
      try {
              const result = await sequelize.query(
                  'SELECT * FROM view_deliverer_work_days',
                  { type: QueryTypes.SELECT }
                );
                console.log("view result   ",result)
                return result
          } catch (error) {
              console.log(error)
          }
    }

    public async GetDeliveryBydeleveryId_dayworkId(id:number):Promise<any> 
    {
           try {
            const result = await DelivererDayWork.findOne({
              where :{id},
              raw:true
            })

            return result === null ? null :result
           } catch (error) {
               console.log(error)
           }
    }
          public async UpdateDeleveryWithDaysWork(updateNewdeliveryDay :any ,deliveryid :number,olddayworkid:number):Promise<any>
          {
            const t = await sequelize.transaction();
            let updateDelivery :any;
                       try {

                        console.log("repoooooooooooooo  update ",updateNewdeliveryDay)
                        //{ nbrHours: 4, dayWorkid: 1 }
                        const {nbrHours,dayWorkid} =updateNewdeliveryDay
                          //new from body request 
                          const existing = await DelivererDayWork.findOne({
                            where: { delivererid: deliveryid, dayWorkid:dayWorkid},
                            transaction: t
                          });

                      if(existing)
                      {

                        console.log("*******************    hereeeeeeeeeeeeeeee  ")
                       

                        if (dayWorkid === olddayworkid) {

                          updateDelivery =     await existing.update({nbrHours},{ transaction: t })  ;

                        }
                        else {

                          updateDelivery =     await existing.update({nbrHours},{ transaction: t })  ;

                          await DelivererDayWork.destroy({
                            where :{
                              delivererid:deliveryid,
                              dayWorkid:olddayworkid
                            },
                            transaction: t

                           })



                        }

                            
                            
                      }else
                      {

                        updateDelivery =   await DelivererDayWork.update({
                          nbrHours:nbrHours,
                          dayWorkid:dayWorkid
                        },
                        {
                          where :{
                            delivererid:deliveryid,
                            dayWorkid:olddayworkid
                          },
                          transaction: t
                        }
                      )
                     

                      }

                       



                          await t.commit() ;


                          console.log("updateDelivery updateDelivery ffin  repoooo    ",updateDelivery)

                          const resultSuccesOrFailedUpdateDelivery = updateDelivery[0] === 0 ? false :true  ;

                          console.log(" resultSuccesOrFailedUpdateDelivery  ",resultSuccesOrFailedUpdateDelivery)
                          return resultSuccesOrFailedUpdateDelivery
                         
                       } catch (error) {
                        await t.rollback()
                          console.log(error)
                       }
          }


          public async DeleteDeleveryWithDaysWork(deliveryid :number,olddayworkid:number):Promise<any>
          {

            const t = await sequelize.transaction();

            //  console.log(" deliveryid :number,olddayworkid:",deliveryid ,olddayworkid )
            let deleteDelivery:any ;
                      try {
                        
                        deleteDelivery =     await DelivererDayWork.destroy({
                          where :{
                            delivererid:deliveryid,
                            dayWorkid:olddayworkid
                          },
                          transaction: t

                         })

                        // console.log("deleteeeeeeee  in reppo  deleteDelivery  ",deleteDelivery)
                         const resultSuccesOrFailedDeleteDelivery = deleteDelivery[0] === 0 ? false :true  ;
                  await t.commit()
                    return resultSuccesOrFailedDeleteDelivery ;
                      } catch (error) {
                       await  t.rollback()
                        console.log(error)
                      }
          }

}