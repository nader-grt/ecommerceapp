


export default abstract class ISupplierRepo {




  public     abstract   createSupplier(supplier :any):Promise<any>;
 

  public     abstract   GetSupplierByID(id:number):Promise<any>;
 

  public  abstract      DeleteSupplierByID(id:number):Promise<any>


  public  abstract     UpdateSupplierByID(supplierUpdated:any ,id:number):Promise<any> ;
}
