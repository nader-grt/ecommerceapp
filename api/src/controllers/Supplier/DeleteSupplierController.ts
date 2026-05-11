import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import SupplierRepo from "../../repo/SupplierRepo/SupplierRepo";
import { RequestAuth } from "../../middleware/verifyToken";





export default class DeleteSupplierController extends BaseController {


  private _supplierRepo:SupplierRepo

  constructor() {
    super();
    this._supplierRepo = new SupplierRepo();
  }

  protected async executeImpl(req: RequestAuth, res: Response): Promise<any> {


    const {id}  = req.params;
    const supplierId = Number(id) ;
    let spplierFounded : any ;
    const userid = req.user?.id;
    let supplierFounded :any ;
 

 
    
    try {
     

      supplierFounded =    await SupplierRepo.FindSupplier(Number(userid)) ;

  //  console.log("supplierFounded  delete 1  ",supplierFounded ,"typeeeeeee  ",typeof supplierFounded.supplier.id ,"res  ",supplierFounded.supplier.id)

          
      if(Number(supplierId))
      {

        const isSupplierFounded :boolean =        await SupplierRepo.FindSupplierById(Number(supplierId))
        if(!isSupplierFounded) 
        {
         return this.notFound(res,`this supplier  not found by ${supplierId}`) ;
          
        }
      }

                      await this._supplierRepo.DeleteSupplierByID(Number(supplierFounded.supplier.id),Number(userid))
                       return this.ok(res, "delete supplier  with success ok");
    } catch (error) {
      console.log(error)
    }

   
  }
}
