import OrderRepo from "../../repo/OrderRepo/OrderRepo";

interface IDeleteOrderDTO {
    customerorderId: number;
    actor: {
      ownerId: number;
      ownerRole: string;
      ownerEmail?: string;
    };
  }


export default class DeleteOrderByAdminUseCase
{



                private _deleteorderByAdminusecase!:OrderRepo

                constructor(deleteOrderUseCase:OrderRepo)
                {
                    this._deleteorderByAdminusecase = deleteOrderUseCase ;
                }

               async execute(dto:IDeleteOrderDTO):Promise<any>
               {
                          try {
                                 

                            console.log("ddddd delete admin order  ",dto)
                                        const order = await this._deleteorderByAdminusecase.FindOrderById(Number(dto.customerorderId)) ;

                                        console.log("order delete ",order)

                                        if(!order)
                                        {
                                           return {success:false,message:"order not founf"}
                                        }

                             const {id}  = order ;
                             console.log("iiiiiiddddddddddd  ",id )
                           const isDeleted:boolean =                await this._deleteorderByAdminusecase.DeleteOrderByIdAdmin(Number(id))


                                if(isDeleted)
                                {

                                  return {success:true,message:"order deleted with success "}
                                }
                          } catch (error) {
                            return {success:false,message:"server error  "}
                          }

               }
}