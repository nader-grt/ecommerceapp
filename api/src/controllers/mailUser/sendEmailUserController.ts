import { BaseController } from "../../infra/BaseCOntroller";
import { Request, Response } from "express";
import { MailService } from "../../services/MailService";


export default class sendEmailUserController  extends BaseController
{


      protected _mailService:MailService ;

      constructor()
      {  super()
         this._mailService =  new MailService()
      }
    protected async executeImpl(req: Request, res: Response): Promise<any> 
    {

     
                 const {to,subject,html}  =  req.body;
                   
                 await this.sendMailUser(to,subject,html)  ;
             
                 return this.ok(res, { message: "Email sent successfully" });
                
    }

 

            public async sendMailUser(to:string,subject:string,html:string):Promise<void>
            {

                await this._mailService.sendMail(to,subject,html)
            }


                
    
}