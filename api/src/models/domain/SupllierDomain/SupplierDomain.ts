import userDomain from "../auth/user/userDomain";




export default class SupplierDomain extends userDomain
{


    private companyName: string ="";
    private   companyPhone:string = "";
    private   companyEmail:string = "";
    private   contactPerson:string = "";
    private  userId!:number ;

    constructor()
    {
        super() ;
        this.companyName;
        this.companyPhone;
        this.companyEmail;
        this.contactPerson;
        this.userId = 0 ;
    }

    public get getCompanyName():string 
    {
      return   this.companyName ;
    }

    public set setCompanyName(companyName:string)
    {
         this.companyName = companyName ;
    }


    public get getCompanyPhone():string 
    {
      return   this.companyPhone ;
    }

    public set setCompanyPhone(companyPhone :string) 
    {
         this.companyPhone = companyPhone ;
    }

    public get getCompanyEmail():string 
    {
      return   this.companyEmail ;
    }
    public set setCompanyEmail(companyEmail:string) 
    {
         this.companyEmail = companyEmail ;
    }
    public get getContactPerson():string 
    {
      return   this.contactPerson;
    }
    public set setContactPerson(contactPerson :string) 
    {
         this.contactPerson = contactPerson ;
    }

    public set setUserId(userid:number)
    {
        this.userId = userid ;
    }
    public toCreateSupplier():any
    {
         return {
            companyName: this.companyName,
            companyPhone: this.companyPhone,
            companyEmail:this.companyEmail,
    
           contactPerson :this.contactPerson,
           userId :this.userId

         }
    }
 
}