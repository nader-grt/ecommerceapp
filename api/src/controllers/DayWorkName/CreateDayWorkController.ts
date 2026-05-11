import { Request, Response } from "express"
import { BaseController } from "../../infra/BaseCOntroller"

import { RequestAuth } from "../../middleware/verifyToken";
import CreateDayWorkUseCase from "../../useCases/DayWorkNameUseCase/CreateDayWorkUseCase";



export default class CreateDayWorkController extends BaseController
{



      constructor(private createDayWorkUseCase: CreateDayWorkUseCase) {
        super();
      }
  protected  async executeImpl(req: RequestAuth, res: Response): Promise<any> {
      const {nameDay}  = req.body ;


      try {
         
     


        if (!nameDay) {
          return this.fail(res, "nameDay is required");
        }
          const result = await this.createDayWorkUseCase.execute(nameDay);

            // await this._dayWorkRepo.createNameDay(nameWorkDay) ;
          return this.ok(res,"create name day with success") ;
      } catch (error) {
        
      }

  }
    
}