import FileHandler from "../../filesystem/fileHandle";
import CategoryRepo from "../../repo/categoryRepo/categoryRepo";
import ProductRepo from "../../repo/productRepo/productRepo";
import SupplierRepo from "../../repo/SupplierRepo/SupplierRepo";



interface UpdateProductDTO {
    productIdProduct:number;
    nameProduct: string;
    priceProduct: number;
    categoryIdProduct: number;
    supplierIdProduct: number | null;
    imageName: string;
  }


export default class UpdateProductUseCase
{
    private _productRepoUseCase!: ProductRepo;
    private _fileHandlerUseCase!: FileHandler;
  
    private _categoryRepoUseCase!: CategoryRepo;
    private _supplierRepoUseCase!: SupplierRepo;

    constructor(
      fileHandlerUseCase: FileHandler,
      productUseCase: ProductRepo,
      categoryRepo: CategoryRepo,
      supplierRepo: SupplierRepo
    ) {
      this._productRepoUseCase = productUseCase;
      this._fileHandlerUseCase = fileHandlerUseCase;
      this._categoryRepoUseCase = categoryRepo;
      this._supplierRepoUseCase = supplierRepo;
    }


           async execute(dto:UpdateProductDTO):Promise<any>
           {                      
                                    const {
                                        nameProduct,
                                        priceProduct,
                                        categoryIdProduct,
                                        supplierIdProduct,
                                        imageName,
                                        productIdProduct
                                    } = dto;
                            try {
                                
                            console.log("dto update ",dto)

                            const supId = supplierIdProduct ? Number(supplierIdProduct) : null;

                            const category: any = await this._categoryRepoUseCase.GetCategoryById(
                                Number(categoryIdProduct)
                              );

                              if (!category) {
                                return { success: false, message: "category not found" };
                              }
                          
                              const oldProduct = await this._productRepoUseCase.GetProductById(Number(productIdProduct))

//nameImage
                              console.log("cate pro",{cat:category,pro:oldProduct})


                              console.log("\n\n \n ",oldProduct.nameImage,imageName , "\n\n")
                          const removeoldImageResult =    await this._fileHandlerUseCase.update(oldProduct.nameImage,imageName) ;


                          console.log("removeoldImageResult  ",removeoldImageResult)
                                             const result =                 await this._productRepoUseCase.DeleteProductById(Number(productIdProduct))


                                               if(!result.success)
                                               {

                                                return { success: false, message: " product failed for updated " };
                                               }

                                               return { success: true, message: " product updated with success usecase  " };
                            } catch (error) {
                                console.log(error)
                            }
           }
}                       