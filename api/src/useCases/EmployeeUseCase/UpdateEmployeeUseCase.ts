import EmployeesDomain from "../../models/domain/EmployeeDomain/EmployeeDomain";
import { EmployeeRolePolicy } from "../../Policy/EmployeeRolePolicy";
import EmployeeRepo from "../../repo/employeeRepo/EmployeeRepo";
import { stringToDate } from "../../util/conversionDateString";







interface UpdateEmployeeDTO {
   // userId: number;
    salary?: number;
    hiredAt?: string;
    employeeId:number;
  }
  





export default class UpdateEmployeeUseCase
{

    
               
         private usecaseRepo!:EmployeeRepo ;
         constructor(employeeRepo:EmployeeRepo)
         {
            this.usecaseRepo = employeeRepo ;
         }
     
                async execute(dto:UpdateEmployeeDTO):Promise<{result?:any,message:string,succes:boolean,failed:boolean} |any>
                {
                     const {salary,hiredAt, employeeId} = dto

                    const empId = Number(employeeId) ;
                                try {
                                    
                      


                                    const employee = await this.usecaseRepo.getEmployeeById(empId);
                                    if (!employee) return {message:"Employee not found"};
                                
                                    console.log("eeeeee usecase beforeeee   ",employee)

                                    const employeed = new EmployeesDomain();
                                    if (dto.salary !== undefined) {
                                        employee.updateSalary(dto.salary);
                                      }
                                    
                                      if (dto.hiredAt) {
                                        employee.updateHiredAt(stringToDate(dto.hiredAt));
                                      }
                                    
                                      await this.usecaseRepo.updateEmployee(employee);




            
   
                                
                             const result =        await this.usecaseRepo.updateEmployee(employee);

                          //  console.log("resulttttttttttt  ",result )
                            if(!result)
                            {
                                return {result:null, message: "failed update employee ",failed:false };
                            }
                                    return {result, message: "Employee updated successfully",succes:true };

                                } catch (error) {
                                    console.log(error)
                                }
                }
}