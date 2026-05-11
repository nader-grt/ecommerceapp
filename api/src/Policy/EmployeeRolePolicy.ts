import { Role } from "../models/user";


export class EmployeeRolePolicy {
  static canBeEmployee(role: Role): boolean {

    if (role === Role.ADMIN.toLocaleLowerCase()) return true;
    return   role === Role.ADMIN.toLocaleLowerCase() || Role.DELIVERER.toLocaleLowerCase() === "deliverer" || Role.SECRTRIE.toLocaleLowerCase() === "secrtrie";
  }
}



