import { userRepo } from "../../repo/auth/userRepo/userRepo";

export default class GetAllUserUseCase {
  private _usecaseUserRepo!: userRepo;
  constructor(usecaseUseRepo: userRepo) {
    this._usecaseUserRepo = usecaseUseRepo;
  }

  async execute(): Promise<any> {



                    try {
               const users =       await  this._usecaseUserRepo.FindAllUsersByRoleIsUser("USER")
               if(users.length   === 0)
               {
                 return { success :false,message :"user not found"}
               }

               return { success :true,user :users}
                    } catch (error) {
                      console.log(error)
                    }
  }
}
