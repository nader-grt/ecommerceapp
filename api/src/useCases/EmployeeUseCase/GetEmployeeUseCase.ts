import { Role } from "../../models/user";
import AdminRolePolicy from "../../Policy/AdminRolePolicy";
import { EmployeeRolePolicy } from "../../Policy/EmployeeRolePolicy";
import EmployeeRepo from "../../repo/employeeRepo/EmployeeRepo";




interface GetEmployeeDTO {
    employeeId: number;
    userId: number; // 
  }
  




export default class GetEmployeeUseCase
{

   
    private usecaseRepo!:EmployeeRepo ;
    constructor(employeeRepo:EmployeeRepo)
    {
       this.usecaseRepo = employeeRepo ;
    }



    async execute(dto:GetEmployeeDTO):Promise<any>
    {

                    try {
                        
                        const user = await this.usecaseRepo.FindUserById(dto.userId);
                        if (!user) {
                          return { success: false, message: "User not found" };
                        }
                    
                        //  role is available

                        console.log("rollle  ",user.role ,"EmployeeRolePolicy.canBeEmployee(user.role) ",EmployeeRolePolicy.canBeEmployee(user.role))
                        if (!EmployeeRolePolicy.canBeEmployee(user.role)) {
                          return { success: false, message: "This role cannot be an employee" };
                        }


                        const employee = await await this.usecaseRepo.getEmployeeById(dto.employeeId);
                        if (!employee) {
                          return { success: false, message: "Employee not found" };
                        }
                    
                        

                        // if (employee.getUserId !== user.id) {
                        //   return { success: false, message: "Access denied to this employee" };
                        // }
                    

                     
                        if (!AdminRolePolicy.canBeAdmin(user.role)) {
                            return { success: false, data: " role must  be an admin" };
                          }
                        return {
                          success: true,
                          data: employee,
                        };
                    } catch (error) {
                        console.log(error)
                    }
    }
}