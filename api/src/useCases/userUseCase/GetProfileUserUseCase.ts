import { userRepo } from "../../repo/auth/userRepo/userRepo";





export default class GetProfileUserUseCase
{
    private _usecaseUseRepo!: userRepo;
    constructor(useusecaseuser: userRepo) {
      this._usecaseUseRepo = useusecaseuser;
    }
  
    async execute(userId: number): Promise<any> 
    {
      
         try {


            const user = await this._usecaseUseRepo.FindUserById(userId);


            console.log("step profile  ",user)
            if (!user) {
              return { success: false, message: "user not found " };
            }
      
            return { success: true, user: user };
            
         } catch (error) {
            console.log(error)
         }

      }
}