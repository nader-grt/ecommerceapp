import { User } from "../../models/main";
import { Supllier } from "../../models/Suplliers";
import ISupplierRepo from "./ISupplierRepo";




export default  class  SupplierRepo   extends ISupplierRepo
{

    public     async   createSupplier(supplier :any):Promise<any>
    {
        
         try {

            console.log("in repo supplier ",supplier)
             const resultSupplier :any =   await Supllier.create(supplier) ;

             console.log("object***** ",resultSupplier)
         } catch (error) {
            
         }

    }

    public     async   GetSupplierByID(userid:number):Promise<any>
    {


          try {
            const result = await User.findOne({
                where: { id: userid },
                attributes: [
                  ["id", "TUsersID"],
                  ["address", "AddressSupplier"],
                ],
                include: [
                  {
                    association: "supplier",
                    attributes: [
                      ["id", "TSupplierID"],
                      ["companyName", "companySuppler"],
                      ["companyPhone", "phoneCompany"],
                      ["contactPerson", "supplierContactPersonel"],
                      ["companyEmail", "emailOfCompany"],
                    ],
                    required: true, // INNER JOIN
                  },
                ],
              });

              if (!result) return null;
    

              console.log("ggggggggggggget  result ",result)
              const result1:any = result.get({ plain: true });
              return result1 ;
          } catch (error) {
            
          }


    }

    public  async      DeleteSupplierByID(supplierid:number,userid?:number):Promise<any>
    {

             try {
                const supplier :any = await Supllier.destroy( { where: { id: supplierid } } ) ;
    
                await User.destroy({where :{id:userid}})
             } catch (error) {
                console.log(error)
             }
    }

    public  async     UpdateSupplierByID(supplierUpdated :any,id:number):Promise<any> 
    {

  const supplierId = supplierUpdated.id;
 


        try {
            const updatedSupplier :any =      await Supllier.update({
                companyName: supplierUpdated.companyName,
    companyPhone: supplierUpdated.companyPhone,
    companyEmail: supplierUpdated.companyEmail,
    userId: id,
    contactPerson: supplierUpdated.contactPerson,
            },{where:{id:supplierId}}) ;

            console.log("repo supplier updated ",updatedSupplier)
        } catch (error) {
            console.log(error)
        }
        
    }

     static async FindSupplier(userid:number):Promise<any>
    {

           try {
             
      const user = await User.findOne({
        where: { id: userid },
        include: [
          {
            as: "supplier",
            model:Supllier
            // include: [
            //   {
            //     association: "deliverer",
            //   },
            // ],
          },
        ],
      });
    
      if (!user) return null;
    
      const result:any = user.get({ plain: true });
    
      return result;
           } catch (error) {
            console.log(error)
           }
    }

    static async FindSupplierById(supplierId :number):Promise<boolean>
    {

        const SupplierIsExist :any = await Supllier.findOne({where :{id :supplierId}}) ;
        console.log("******////////////  ",SupplierIsExist)
        if(SupplierIsExist != null)
        {
            return true
        }

        return false ;
    }

}