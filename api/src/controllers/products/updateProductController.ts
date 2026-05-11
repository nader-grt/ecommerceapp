import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";

import UpdateProductUseCase from "../../useCases/productUseCase/UpdateProductUseCase";



export default class updateProductController extends BaseController
{

  
    private _usecaseupdateProduct!:UpdateProductUseCase


    constructor(updateProductUseCase:UpdateProductUseCase)
    {  super()
       

        this._usecaseupdateProduct = updateProductUseCase ;
    }

        protected  async executeImpl(req: Request, res: Response): Promise<any> {
            
         
            const { name, price, categoryId, supplierId } = req.body;
            const file = req.file;
            const {id} = req.params ;
            const productId = Number(id)

                        
    if (!file) {
        return this.badRequest(res, "Product image is required");
      }
                    
                        const dto = {
                            nameProduct: name,
                            priceProduct: Number(price),
                            categoryIdProduct: Number(categoryId),
                            supplierIdProduct: supplierId ? Number(supplierId) : null,
                            imageName: file.filename,
                            productIdProduct:productId
                        };
                        const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif","image/avif"];
                        const MAX_SIZE = 7 * 1024 * 1024 ;



                            try {
                                



                            if (!allowedMimeTypes.includes(file.mimetype)) {
                                return res.status(400).json({
                                message: "Invalid file type. Only JPEG, PNG, GIF allowed",
                                });
                            }


                            console.log("file compare ",{fileSize:file.size,maxSize:MAX_SIZE})
                            if (file.size > MAX_SIZE) {
                              return res.status(400).json({
                                message: `File is too large. Maximum allowed size is ${MAX_SIZE / (1024*1024)} MB`,
                              });
                            }


                         const result =    await this._usecaseupdateProduct.execute(dto)  ;

                         if(!result.success)
                            {
                                // { success: false, message: " product failed for updated " };

                             return  this.fail(res,result.message) ;
                            }
                                return   this.ok(res,result.message) ;
                            } catch (error) {
                                console.log(error)
                            }

               
        }

}
