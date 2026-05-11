import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import SupplierRepo from "../../repo/SupplierRepo/SupplierRepo";
import { RequestAuth } from "../../middleware/verifyToken";
import SupplierDomain from "../../models/domain/SupllierDomain/SupplierDomain";





export default class UpdateSupplierController extends BaseController {


  private _supplierRepo:SupplierRepo;
  private _supplierDomain:SupplierDomain

  constructor() {
    super();
    this._supplierRepo = new SupplierRepo();
     this._supplierDomain=new SupplierDomain()
  }

  protected async executeImpl(req: RequestAuth, res: Response): Promise<any> {
    const { companyName, companyPhone,companyEmail,contactPerson } = req.body;
   


    const userSupplierId : number | any = req.user?.id ;
    let resultReadSupplier :any ;
   

 
    
    try {
     
   

     let supplierResult :any =       await SupplierRepo.FindSupplier(Number(userSupplierId)) ;
     let supplier :any = supplierResult.supplier
  
      if(companyName)
      {
        console.log("1")
       supplier.companyName = companyName
      }
      if(companyPhone)
        {
          
          console.log("2")
          supplier.companyPhone = companyPhone
        }
        if(contactPerson)
          {
            console.log("3")
            supplier.contactPerson =  contactPerson
            
          }
          if(companyEmail)
            {
              console.log("4")
              supplier.companyEmail =   companyEmail
            }

            if(userSupplierId)
            {
              console.log("5")
              supplier.userId = userSupplierId
            }
                     //  console.log("before enter repo controller ",supplier)
                    await this._supplierRepo.UpdateSupplierByID(supplier,userSupplierId) ;
      
    } catch (error) {
      
    }

    return this.ok(res, "updated supplier with success ok");
  }
}
