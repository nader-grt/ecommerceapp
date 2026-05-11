import { userRepo } from "../../repo/auth/userRepo/userRepo";
import OrderRepo from "../../repo/OrderRepo/OrderRepo";

interface ICancelOrderByUserDTO {
   orderId: number;
  
   actor: {
     ownerId: number;
     ownerRole: string;
     ownerEmail?: string;
   };
 }

export default class CancelOrderByUserUseCase
{


                  
                private _cancelorderByUserusecase!:OrderRepo
                private _useRepo!: userRepo;
                constructor(cancelOrderUseCase:OrderRepo,useRepo: userRepo)
                {
                    this._cancelorderByUserusecase = cancelOrderUseCase ;
                    this._useRepo = useRepo ;
                }
    async execute(dto:ICancelOrderByUserDTO):Promise<any>
    {

           try {
                                    console.log("dddddddddd   ",dto)
                       const user = await this._useRepo.FindUserById(dto.actor.ownerId)  ;
                       console.log("user orderrrr  ",user)




                       const order = await this._cancelorderByUserusecase.FindOrderById(Number(dto.orderId))  ;


                       console.log("oooooooooooo          ",order)


               const isCancel = await 
               this._cancelorderByUserusecase.CancelOrderByOrderIdWithUser(Number(dto.orderId),order.status)


               console.log("isCancel  ",isCancel)
            
           } catch (error) {
             console.log(error)
           }
    }
}