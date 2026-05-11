import { ActorUserAdmin } from "../../dbConfig/configApp";
import { userRepo } from "../../repo/auth/userRepo/userRepo";

export interface IUpdateUserProfileDTO {

  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  city: string;

}


export default class UpdateUserProfileUseCase {
  private _usecaseUserRepo!: userRepo;
  constructor(usecaseUserRepo: userRepo) {
    this._usecaseUserRepo = usecaseUserRepo;
  }

  async execute(dto: IUpdateUserProfileDTO):Promise<{success:boolean,message:string}> {
    try {
  

       const user =     await this._usecaseUserRepo.FindUserByEmail(dto.email)  ;

  
       if(!user)
       {
        return {success:false,message:"user not found"}
       }


       return {success:false,message:"user not found111"}
    } catch (error) {
      console.log(error);
      return {success:false,message:"internal server error"};
    }
  }
}
