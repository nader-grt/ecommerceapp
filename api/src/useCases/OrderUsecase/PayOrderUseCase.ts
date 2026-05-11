import OrderDomain from "../../models/domain/OrderDomain/OrderDomain";
import { userRepo } from "../../repo/auth/userRepo/userRepo";
import OrderRepo from "../../repo/OrderRepo/OrderRepo";

interface IPaidOrderDTO
{
    orderId:number ;
    paidAmount:number ;
    actor: {
        ownerId: number;
        ownerRole: string;
        ownerEmail?: string;
      };
}

export default class PayOrderUseCase
{
    private _userRepo!:userRepo
    private _orderRepo!:OrderRepo
    constructor( userrepo  :userRepo,orderRepo:OrderRepo )
    {
        this._orderRepo = orderRepo ;
        this._userRepo = userrepo ;
     
    }

           async execute(dto:IPaidOrderDTO):Promise<any>
            {
                       
                 try {
                    
                    console.log("dtooooooo  pay usecase   ",dto)

                    const user = await this._userRepo.FindUserById(dto.actor.ownerId) ;

                    if(!user)
                        {
                           return {success:false,message:"user not found "}
                        }

                        const order = await this._orderRepo.FindOrderById(dto.orderId) ;

                        if(!order)
                            {
                               return {success:false,message:"order not found "}
                            }

                            if (order.customerId !== dto.actor.ownerId) {
                                return { success: false, message: "Unauthorized payment attempt" };
                              }

                            
  
  

  
                              const result =  await this._orderRepo.PayOrderByOrderByUser({
                                orderId: dto.orderId,
                                paidAmount: dto.paidAmount,
                              });

                              if(!result.success)
                              {
                                return {success:false,}

                              }
                              return {success:true,}

                              console.log("result pay  " )
                          
                 } catch (error) {
                    console.log(error)
                 }

            }
}