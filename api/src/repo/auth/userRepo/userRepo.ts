import { Transaction } from "sequelize";
import { sequelize, User } from "../../../models/main";
import IUser, { Role } from "../../../models/user";
import IUserRepoInterface from "./userRepoInterface";

export default interface IUserResponse {
  id?: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role?: Role;
}

export interface IUserRegister {
  id?: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password?: string;
  role?: Role;
}

export class userRepo extends IUserRepoInterface {

  public async DeleteUser(userId: number): Promise<number | null> {
    try {
      const deletedUser = await User.destroy({
        where: { id: userId },
      });

      return deletedUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async FindUserByEmailLogin(email: string): Promise<IUser | null> {
    try {
      const user = await User.findOne({
        where: { email },
        raw: true,
      });

      return user as IUser | null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async UpdateRoleUser(
    userId: number,
    role: Role,
    transaction?: Transaction
  ): Promise<IUserResponse> {

    const user = await User.findByPk(userId, { transaction });

    if (!user) {
      throw new Error("User not found");
    }

    // ADMIN stays ADMIN
    if (user.role === Role.ADMIN) {
      return user.get({ plain: true }) as IUserResponse;
    }

    await user.update(
      { role },
      { transaction }
    );

    return user.get({ plain: true }) as IUserResponse;
  }

  public async FindUserByEmail(
    email: string
  ): Promise<IUserResponse | null> {
    try {
      const user = await User.findOne({
        where: { email },
        raw: true,
      });

      if (!user) return null;

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        role: user.role,
      };

    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async FindUserById(
    id: number
  ): Promise<IUserResponse | null> {

    try {

      const resultUser = await User.findByPk(id);

      if (!resultUser) return null;

      return resultUser.get({ plain: true }) as IUserResponse;

    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async FindAllUsersByRoleIsUser(
    role: Role
  ): Promise<IUserResponse[]> {

    try {

      const listUsers = await User.findAll({
        where: { role },
      });

      if (!listUsers.length) return [];

      return listUsers.map((user) => {
        const u = user.get({ plain: true });

        return {
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          phone: u.phone,
          email: u.email,
          role: u.role,
        };
      });

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  public static async existUserId(
    id: number
  ): Promise<boolean> {

    try {

      const user = await User.findOne({
        where: { id },
        raw: true,
      });

      return !!user;

    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async updateUser(
    user: IUserResponse,
    userid?: number
  ): Promise<boolean> {

    try {

      const [updatedRows] = await User.update(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
        },
        {
          where: { id: userid },
        }
      );

      return updatedRows > 0;

    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async updateUserByAdmin(
    user: IUserResponse,
    userid?: number
  ): Promise<IUser | null> {

    try {

      await User.update(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: user.role,
        },
        {
          where: { id: userid },
        }
      );

      const updatedUser = await User.findByPk(userid);

      return updatedUser;

    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async registerUser(
    user: IUserRegister,
    t?: Transaction
  ): Promise<IUser> {

    try {

      const createdUser = await User.create(user as any, {
        transaction: t,
      });

      return createdUser.get({ plain: true });

    } catch (error) {

      console.error("REGISTER USER ERROR:", error);
      throw error;
    }
  }

  public async FindUserByEmail2(
    email: string
  ): Promise<IUser | null> {

    try {

      return await User.findOne({
        where: { email },
      }) as IUser | null;

    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async IsExistUser(email: string): Promise<boolean> {

    try {

      const user = await User.findOne({
        where: { email },
      });

      return !!user;

    } catch (error) {

      console.log(error);
      return false;
    }
  }

  public async getUserById(id: number): Promise<IUser | null> {

    try {

      const user = await User.findOne({
        where: { id },
      });

      return user as IUser | null;

    } catch (error) {

      console.error(error);
      throw error;
    }
  }
}