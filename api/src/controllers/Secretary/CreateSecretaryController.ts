import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import SecretaryDomain from "../../models/domain/SecretaryDomain/SecretaryDomain";
import SecretaryRepo from "../../repo/SecretaryRepo/SecretaryRepo";
import { RequestAuth } from "../../middleware/verifyToken";



/**
 * 
 * 
 * 
    private employeeId:number = 0 ;

            private nbrAppointments:boolean = false ;
 */



export default class CreateSecretaryController  extends BaseController
{


    private _secretaryDomain:SecretaryDomain;
    private _secretaryRepo:SecretaryRepo

    constructor()
    {
        super() ;
        this._secretaryDomain = new SecretaryDomain() ;
        this._secretaryRepo =  new SecretaryRepo()
    }

    protected async  executeImpl(req: RequestAuth, res: Response): Promise<any> {
        

          const { nbrAppointments}  = req.body

            
        const  secretaryid = req.user?.id     ;
        console.log(secretaryid,"***********")

                const resultempSecretarId:any =  await SecretaryRepo.getSecretaryIsUser()   ;

                console.log("resultempSecretary id empl id  ",resultempSecretarId)

                try {
                     
                        
                        return this.ok(res,"Secretaryy  ")
                } catch (error) {
                        
                }
        
     
}


}