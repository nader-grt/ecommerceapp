import express, { Request, Response } from "express";
import { userRepo } from "../../repo/auth/userRepo/userRepo";
import { Role } from "../../models/user";
import { ActorUserAdmin } from "../../dbConfig/configApp";

interface IGetUser {
  userId: number;
  actor?: ActorUserAdmin;
}

export default class GetUserByAdminUseCase {
  private _usecaseUseRepo!: userRepo;
  constructor(useusecaseuser: userRepo) {
    this._usecaseUseRepo = useusecaseuser;
  }

  async execute(dto: IGetUser): Promise<any> {
    try {

                  console.log("usecase factory  step 3 ",dto)
      if (dto.actor?.actorRole?.toLowerCase() !== Role.ADMIN.toLowerCase()) {
        return {
          success: false,
          message: "Only admin can get user",
        };
      }
      const user = await this._usecaseUseRepo.FindUserById(dto.userId);


      console.log("step 4  ",user)
      if (!user) {
        return { success: false, message: "user not found " };
      }

      return { success: true, user: user };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Server error" };
    }
  }
}
