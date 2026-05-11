import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import SupplierRepo from "../../repo/SupplierRepo/SupplierRepo";
import SupplierDomain from "../../models/domain/SupllierDomain/SupplierDomain";
import { RequestAuth } from "../../middleware/verifyToken";


export default interface ISupplierRequest
{

  companyName :string; 
  companyPhone :string;
  companyEmail :string;
  contactPerson:string;
  userid:number;
}


export default class CreateSupplierController extends BaseController {

 private _supplierRepo:SupplierRepo
 private _supplierDomain:SupplierDomain


      private async ReadSupplioer(supplierReq:ISupplierRequest,userid:number):Promise<any>
      {
         
        return {
          companyName:this._supplierDomain.setCompanyName = supplierReq.companyName,

          companyPhone:this._supplierDomain.setCompanyPhone = supplierReq.companyPhone,
          companyEmail:this._supplierDomain.setCompanyEmail = supplierReq.companyEmail,
          contactPerson:this._supplierDomain.setContactPerson = supplierReq.contactPerson,
          userid:this._supplierDomain.setUserId = userid
        }

      }

   private buildSupplier(supplierResult:ISupplierRequest,userid:number):SupplierDomain
   {


   
      const supplier = new SupplierDomain() ;
      supplier.setCompanyName = supplierResult.companyName ;
      supplier.setCompanyPhone = supplierResult.companyPhone;
      supplier.setCompanyEmail = supplierResult.companyEmail;
      supplier.setContactPerson = supplierResult.contactPerson
      supplier.setUserId = userid

      console.log("before return building supplier ",supplier)
    return supplier
   }
  constructor() {
    super();
    this._supplierRepo = new SupplierRepo();
    this._supplierDomain = new SupplierDomain()
  
  }

  protected async executeImpl(req: RequestAuth, res: Response): Promise<any> {
    const { companyName, companyPhone,companyEmail,contactPerson } = req.body;

      const userSupplierId : number | any = req.user?.id ;
      let resultReadSupplier :any ;
      let supplier :any ;

    const dtoSupplier :any = {
      companyName, 
      companyPhone,
      companyEmail,
      contactPerson

    }

      

    if(userSupplierId)
      {
        resultReadSupplier  =  await this.ReadSupplioer(dtoSupplier,Number(userSupplierId)) ;
      }
 
    
    try {
        
   

     if(resultReadSupplier)
     {
      supplier = this.buildSupplier(resultReadSupplier,userSupplierId) ;
     }

    //  console.log(supplier, "5555555555","resultSupplier resultSupplier ",resultReadSupplier,"nnnnnnnnnnulll id   ",userSupplierId)

      if(supplier)
      {

        console.log("**************  ",supplier)
        await this._supplierRepo.createSupplier(supplier.toCreateSupplier()) ;
      }
        
      return this.ok(res, "supllier created with success ok");
      
    } catch (error) {
      
    }

   
  }
}
