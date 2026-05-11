import EmployeesDomain from "../EmployeeDomain/EmployeeDomain";


export default class SecretaryDomain  extends EmployeesDomain
{


    /*
      canManageAppointments:Boolean;
  employeeId?:Number;
    */ 


            private employeeId:number = 0 ;

            private nbrAppointments:number = 0 ;
       constructor()
       {
        super() //heritage 
        this.employeeId = 0 ;
                    this.nbrAppointments  = 0 ;

       }



       public get getemployeeId():number
       {
               return    this.employeeId  ;

       }




       public set getEmployeeId(empId:number)
       {
                   this.employeeId = empId  ;

       }



       public get getnbrAppointments( ):number
       {
               return     this.nbrAppointments   ;

       }



       public set  setnbrAppointments(nbrAppoiment:number)
       {
                   this.nbrAppointments = nbrAppoiment;

       }


       public toCreateSecretary():any
       {

        return {
            nbrAppointments: this.nbrAppointments,
            employeeId:  this.employeeId
        }
       }



}