import ProductRepo from "../../repo/productRepo/productRepo";



interface ProductRandomDTO
 {
    random:boolean;
    limit:number;
 }

export default class GetProductRandomUseCase
{


              private _useCaseProductRepo!:ProductRepo
              constructor(useCaseProductRepo:ProductRepo)
              {
               this._useCaseProductRepo = useCaseProductRepo ;

              }


              async execute(dto:ProductRandomDTO):Promise<any>
              {
            
                  console.log("dto *** ",dto)
                    

                            try {
                                
                              const result =     await this._useCaseProductRepo.getRandomProductsCached(dto.limit)

                              if(result.length> 0)
                              {
                                return { success: true, data: result };
                              }

                              return { success: false, message: "not product on home page " };
                            } catch (error) {
                                console.log(error)
                            }

              }
}