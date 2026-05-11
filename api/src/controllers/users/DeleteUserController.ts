import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import DeleteUserUseCase from "../../useCases/userUseCase/DeleteUserUseCase";
import { RequestAuth } from "../../middleware/verifyToken";
import { ActorUserAdmin } from "../../dbConfig/configApp";



export default class DeleteUserController extends BaseController
{
 
       private _deleteUserUseCase!:DeleteUserUseCase
     constructor(deleteUserUseCase:DeleteUserUseCase)
     {super()
    
       this._deleteUserUseCase = deleteUserUseCase ;
     }
    protected async executeImpl(req: RequestAuth, res: Response): Promise<any> 
    {
        const {id}  = req.params ;
        const userId :number = Number(id)  ;

        const actor: ActorUserAdmin = {
          actorId: Number(req.user?.id),
          actorEmail: req.user?.email,
          actorRole: req.user?.role,
        };
    

     
   
                try {
                    
                  const dto = {
                    userId,actor
                  }
                   
             
             

                         
             const result =       await this._deleteUserUseCase.execute(dto) ;
             if(!result.success)
             {
                return this.fail(res,result.message)
             }
               
             
             return this.ok(res,result.message)
              return 
                } catch (error) {
                    console.log(error)
                }
        
    }
}