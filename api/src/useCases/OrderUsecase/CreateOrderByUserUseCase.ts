import OrderDomain from "../../models/domain/OrderDomain/OrderDomain";
import OrderRepo from "../../repo/OrderRepo/OrderRepo";
import { userRepo } from "../../repo/auth/userRepo/userRepo";
import ProductRepo from "../../repo/productRepo/productRepo";

interface CreateOrderDTO {
 // custmerId: number;
  items: [];
  actor: {
    ownerId: number;
    ownerRole: string;
    ownerEmail?: string;
  };
}

export default class CreateOrderByUserUseCase {
  private _createorderusecase!: OrderRepo;
  private _useRepo!: userRepo;
  private  _productRepo!:ProductRepo
  constructor(createOrderUseCase: OrderRepo, user: userRepo ,productRepo:ProductRepo) {
    this._createorderusecase = createOrderUseCase;
    this._useRepo = user;
    this._productRepo = productRepo
  }

  async execute(dto: CreateOrderDTO): Promise<any> {
    try {
      console.log("dddddddddd  ", dto);
      const user = await this._useRepo.FindUserById(Number(dto.actor.ownerId));
//
         console.log("ccccccccccccustmer ", user);




                if(!user)
                {

                  return {success:false,message:"unautorized "}
                }

              
                const productIds = dto.items.map(i => i["productId"]);
                 
                const productMap = await ProductRepo.getProductsMapByIds(productIds);



                // console.log(" productMap  ",productMap)

                  const  order  =  new OrderDomain(dto.actor.ownerId)  ;

                    console.log("ooo   ", order )   
                    
                      for(let item of dto.items)
                      {
                          console.log("itemmmmmmmmm  ",item)
                          const product = productMap.get(item["productId"]) ;
                          console.log("pppppppppp      ",product)

                          if (!product) throw new Error(`Product ${item["productId"]} not found`);
                          //   addItem( productId: number, name: string, quantity: number, price: number )
                              order.addItem(product.id, product.name, item["quantity"], product?.price);
                          
                      }


                      const totalAmount = order.getTotalAmount();
                      //   console.log(totalAmount);
 
   console.log("orderrrrrrrrrrrr  ",order)
                    await  this._createorderusecase.CreateOrderByAdmin(order)
                      return {success:true,message:"order created with success"}

    } catch (error) {
      console.log(error);
    }
  }
}
