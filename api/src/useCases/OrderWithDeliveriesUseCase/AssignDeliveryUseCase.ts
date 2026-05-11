import { userRepo } from "../../repo/auth/userRepo/userRepo";
import DeleveryPersonRepo from "../../repo/delevryPersonRepo/DeleveryPersonRepo";
import OrderRepo from "../../repo/OrderRepo/OrderRepo";
import OrderWithDeliverieRepo from "../../repo/OrderWithDeliverieRepo/OrderWithDeliverieRepo";

interface IAssignDeliveryDTO
{
    orderdeliveryId:number;
    deliveryPersonId:number;
    actor: {
        ownerId: number;
        ownerRole: string;
        ownerEmail?: string;
      };

}

export default class AssignDeliveryUseCase
{
              private   _orderepo!:OrderRepo
               private _delevrerPersonUseCase!:DeleveryPersonRepo
               private _orderWithDeliverieRepo!:OrderWithDeliverieRepo
               constructor(orderWithDeliverieUseCaseRepo:OrderWithDeliverieRepo,userUseCase:DeleveryPersonRepo,order:OrderRepo)
               {
                      this._orderWithDeliverieRepo      = orderWithDeliverieUseCaseRepo ;
                      this._delevrerPersonUseCase = userUseCase ;
                      this._orderepo = order ;
               }

               async execute(dto:IAssignDeliveryDTO):Promise<any>
               {

                   try {

                 //   console.log("dtooo assign ",dto)
                    
                        const personDeleverer = await this._delevrerPersonUseCase.GetDelevryByID(dto.deliveryPersonId) ;
                     //  console.log("uuuuuuuu ddddddd ",personDeleverer)

                        if (!personDeleverer) {
                            return { success: false, message: "deliverer  not found" };
                          }


                          const orderDel = await this._orderWithDeliverieRepo.FindOrderWithDeliver(dto.orderdeliveryId)
                         // console.log("ooooooooo 1111111111 ",orderDel)
                           const orderuser = await this._orderepo.FindOrderById(Number(orderDel.orderId))

                         
                          if (!orderuser) {
                            return { success: false, message: "deliverer  not found" };
                          }


                          const dataAssignToDeleverer :any = {
                            orderdeliveryId:Number(orderDel.id),
                           deliveryPersonId:Number(personDeleverer.id),
                           orderId:Number(orderuser.id)
                          }

                     //     console.log("data pppppppppp  ",dataAssignToDeleverer)
               const orderWithDeliver:any= await this._orderWithDeliverieRepo.AssignOrderToDelivrerPerson(dataAssignToDeleverer)


               console.log("uuuuuuuuuuuusecase  0",orderWithDeliver)
                      return { success: true, message: "assign  deliverer  with success " };

                   } catch (error) {
                    
                   }
               }
}