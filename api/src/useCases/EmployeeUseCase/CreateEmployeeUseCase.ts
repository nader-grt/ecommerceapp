import IEmployeeRequest from "../../controllers/Employee/CreateEmployeeController";
import EmployeesDomain from "../../models/domain/EmployeeDomain/EmployeeDomain";
import { EmployeeRolePolicy } from "../../Policy/EmployeeRolePolicy";
import EmployeeRepo from "../../repo/employeeRepo/EmployeeRepo"
import { stringToDate } from "../../util/conversionDateString";


interface CreateEmployeeDTO {
    salary: number;
    hiredAt: string;
    userId: number;
  }




export default class CreateEmployeeUseCase
{




    // private createEmployeeDomain(
    //     empRequest: IEmployeeRequest,
    //     userIdRole: number
    //   ): EmployeesDomain {
      
    //         const employee = new EmployeesDomain();
          
    //         employee.setSalary = empRequest.salary;
    //         employee.sethiredAt = stringToDate(empRequest.hiredAt);
    //         employee.setUserId = userIdRole;
          
    //         return employee;
    //   }

         private usecaseRepo!:EmployeeRepo ;
    constructor(employeeRepo:EmployeeRepo)
    {
       this.usecaseRepo = employeeRepo ;
    }


    async execute(dto:CreateEmployeeDTO):Promise<{ success: boolean; message: string }>
    {
                        const {userId,salary,hiredAt} = dto
                       
                    try {



                     
                        // }
                        const user = await this.usecaseRepo.FindUserById(dto.userId);
                        if (!user) {
                          return { success: false, message: "User not found" };
                        }
                    
                        // 2is role is available
                        if (!EmployeeRolePolicy.canBeEmployee(user.role)) {
                          return { success: false, message: "This role cannot be an employee" };
                        }

                        const exists = await this.usecaseRepo.FindEmployeeBefore(Number(dto.userId));
                        if (exists) {
                          return { success: false, message: "Employee already exists" };
                        }
                    
                       
                   

                       const employee = new EmployeesDomain();
                       employee.setSalary = dto.salary;
                       employee.sethiredAt = stringToDate(dto.hiredAt);
                      // employee.setUserId = dto.userId;
                   
                       // 
                       await this.usecaseRepo.createEmployee(
                         employee.toPersistence(),
                         dto.userId
                       );
                    
                     

                            
         

                    
                        return { success: true, message: "Created" };
                    } catch (error) {
                        console.log(error)
                        return {success:false,message:""}
                    }
    }
    
}