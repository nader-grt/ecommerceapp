import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import { RequestAuth } from "../../middleware/verifyToken";
import SupplierRepo from "../../repo/SupplierRepo/SupplierRepo";





export default class GetSupplierController extends BaseController {

  private _supplierRepo:SupplierRepo

  constructor() {
    super();
    this._supplierRepo = new SupplierRepo();
  }

  protected async executeImpl(req: RequestAuth, res: Response): Promise<any> {
   
    const idParam :any = req.query.id;
    const supplierId :any = idParam ? Number(idParam) : undefined;
    const {id} = req.params ;
   // const supplierId = Number(id) ;
    const userId = req.user?.id;
     let supplierFounded :any ;
     let supplierResponse :any ;

 


    
    try {
        
      supplierFounded =    await SupplierRepo.FindSupplier(Number(userId)) ;

  

          
        if(Number(supplierId))
        {

          const isSupplierFounded :boolean =        await SupplierRepo.FindSupplierById(Number(supplierId))
          if(!isSupplierFounded) 
          {
           return this.notFound(res,`this supplier  not found by ${supplierId}`) ;
            
          }
        }

      supplierResponse =   await this._supplierRepo.GetSupplierByID(Number(supplierFounded.id))

      return this.resultValue(res,"get supplier with success ",supplierResponse)
      
    } catch (error) {
      console.log(error)
    }

   // return this.ok(res, "get supplier  with success ok");
  }
}
