import { Role } from "../../models/user";
import EmployeeRepo from "../../repo/employeeRepo/EmployeeRepo";
import { userRepo } from "../../repo/auth/userRepo/userRepo";

interface DeleteEmployeeDTO {
  empId: number;
  userId?: number; //
}

export default class DeleteEmployeeUseCase {
  private usecaseEmpRepo!: EmployeeRepo;
  private usercaseUserRepo!: userRepo;
  constructor(employeeRepo: EmployeeRepo, userepo: userRepo) {
    this.usecaseEmpRepo = employeeRepo;
    this.usercaseUserRepo = userepo;
  }

  async execute(dto: DeleteEmployeeDTO): Promise<any> {
    const { empId, userId } = dto;

    try {
      const employee = await this.usecaseEmpRepo.getEmployeeById(empId);
      if (!employee) return { message: "Employee not found" };

      // console.log("eeeeee usecase beforeeee   ",employee)

      // Number(employee.userId) this user is delevero  or secretary
      const user = await this.usercaseUserRepo.FindUserById(Number(userId));

      if (!user) return { success: false, message: "user not found" };

      if (user[0].role.toLowerCase() !== Role.ADMIN.toLowerCase()) {
        return {
          success: false,
          message: "Access denied: only admin can delete",
        };
      }

      console.log("object");
      await this.usecaseEmpRepo.deleteEmployee(empId, Number(employee.userId));

      //   Update the user's role back to normal (USER)
      //  await this.usercaseUserRepo.updateRole(employee.userId, Role.USER);

      return { success: true, message: "Employee deleted and role updated" };
    } catch (error) {
      console.log(error);
    }
  }
}
