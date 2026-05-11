import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import GetProductRandomUseCase from "../../useCases/productUseCase/GetProductRandomUseCase";



interface listProductHomeDTO
{
   nameProduct:string ;
   priceProdust:number;
   urlImage:string;
}

export default class GetProductRandomController  extends BaseController
{



  async listProduct(products:any[]):Promise<listProductHomeDTO[] | any>
  {
   return products.map((p) => ({
       nameProduct: p.name,
       priceProdust: p.price,
       urlImage: `${process.env.BASE_URL}/images/${p.nameImage}`,
     }));
  }

     private _getProductRandomUseCase!:GetProductRandomUseCase

     constructor(getProductRandomUseCase:GetProductRandomUseCase)
     {super()

        this._getProductRandomUseCase = getProductRandomUseCase ;
     }

     protected async  executeImpl(req: Request, res: Response): Promise<any> {
                               const { random, limit } = req.query;
                              try {

                          

                                const result = await this._getProductRandomUseCase.execute({
                                  random: random === "true",
                                  limit: Number(limit) > 0 ? Number(limit) : 8,  // nbr 10 
                                });


                                if(!result.success)
                                  {
                                   return this.fail(res,result.message)
                                  }
   
   
                               
   
                                  const resultListProducts  =   await this.listProduct(result.data)
                                  return this.resultValue(res,"products ",resultListProducts)
                                
                              } catch (error) {
                                
                                console.log(error)
                              }
     }
}