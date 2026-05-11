import userDomain from "../auth/user/userDomain";

export default class EmployeesDomain extends userDomain
{

  protected employeeId!: number;
  private salary!: number;
  private hiredAt!: Date;
  protected userId!: number;
      
  constructor(props?: {
    employeeId: number;
    salary: number;
    hiredAt: Date;
    userId: number;
  }) {
    super();

    if (props) {
      this.employeeId = props.employeeId;
      this.salary = props.salary;
      this.hiredAt = props.hiredAt;
      this.userId = props.userId;
    }
  }
      public get getSalary():number
      {
        return this.salary ;
      }
      public set setSalary(salary :number)
      {
         this.salary = salary;
      }
      public get gethiredAt():Date
      {
        return this.hiredAt ;
      }
      public set sethiredAt(hireAt :Date)
      {
         this.hiredAt = hireAt;
      }

     public get empid() {
        return this.employeeId;
      }
    
    public  updateSalary(value: number) {
        if (value <= 0) throw new Error("Invalid salary");
        this.salary = value;
      }
    
   public   updateHiredAt(date: Date) {
        this.hiredAt = date;
      }
    
    
      public toPersistence():any {
        return {
          salary: this.salary,
          hiredAt: this.hiredAt,
          userId: this.userId,
        };
      }
}