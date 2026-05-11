import EmployeesDomain from "../EmployeeDomain/EmployeeDomain";

export default class DeleveryPersonDomain extends EmployeesDomain
{



  
    private carType: string = "";
   protected employeeId! :number ;

  

    constructor() {
        super();
      }
          



         //work with image 
         public get getCarType():string
         {
            return this.carType ;
         }
    
    
         public set setCarType(value:string)
         {
             this.carType  = value;
         }

         set setDelevryId(value: number) {
            this.employeeId = value;
          }

         public toPersistence():any {
             return {

            
                carType  :  this.carType,
                employeeId:this.employeeId
             };
         }

         public toResponse(data?:any)
         {
          console.log("dataaaaaaaaaa  ",data)
          return {
        //   this.userId : 1,
            // this.empUserId : data.employee.empUserId,
            // this.delivererId : data.employee.deliverer.delivererId,
            // this.carType : data.employee.deliverer.carType,
            // this.employeeId : data.employee.deliverer.employeeId,
            userId: data.TUsersId,
    employeeId: data.employee?.TEmpId ?? null,
    delivererId: data.employee?.deliverer?.TdelivererID ?? null,
    carType: data.employee?.deliverer?.TDeleverycarType ?? null,
    deliveryEmployeeId: data.employee?.deliverer?.TDeliveryId ?? null,
          }
         }
}