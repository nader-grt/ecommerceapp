import { Transaction } from "sequelize";
import IUser, { Role } from "../../../models/user";
import IUserResponse, { IUserRegister } from "./userRepo";

export default abstract class IUserRepoInterface {

  protected abstract FindUserById(
    userId: number
  ): Promise<IUserResponse | null>;

  protected abstract FindAllUsersByRoleIsUser(
    role: Role
  ): Promise<IUserResponse[]>;

  protected abstract DeleteUser(
    userId: number
  ): Promise<number | null>;

  protected abstract updateUser(
    user: IUserResponse,
    userId?: number
  ): Promise<boolean>;

  protected abstract updateUserByAdmin(
    user: IUserResponse,
    userId?: number
  ): Promise<IUser | null>;

  protected abstract UpdateRoleUser(
    userId: number,
    role: Role,
    transaction?: Transaction
  ): Promise<IUserResponse>;

  protected abstract registerUser(
    user: IUserRegister,
    t?: Transaction
  ): Promise<IUser>;

  protected abstract FindUserByEmail(
    email: string
  ): Promise<IUserResponse | null>;

  protected abstract FindUserByEmailLogin(
    email: string
  ): Promise<IUser | null>;

  protected abstract FindUserByEmail2(
    email: string
  ): Promise<IUser | null>;

  protected abstract IsExistUser(
    email: string
  ): Promise<boolean>;

  protected abstract getUserById(
    id: number
  ): Promise<IUser | null>;
}