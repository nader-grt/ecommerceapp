import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import { RequestAuth } from "../../middleware/verifyToken";
import DeleveryPersonRepo from "../../repo/delevryPersonRepo/DeleveryPersonRepo";

export default class GetDelevryPersonController extends BaseController {
  protected _deleveryPersonRepo: DeleveryPersonRepo;
  constructor() {
    super();
    this._deleveryPersonRepo = new DeleveryPersonRepo();
  }

  protected async executeImpl(req: RequestAuth, res: Response): Promise<any> {
    const { id } = req.params;
    const delevryid = Number(id);

    console.log("idddddddddddddd", typeof delevryid);

    try {
      const delevryResult: any = await this._deleveryPersonRepo.GetDelevryByID(
        delevryid
      );
      if (delevryResult === null) {
        return this.notFound(res, "delivery not found ");
      }
      //employee?.deliverer
      //    const delevery : any = delevryResult.employee?.deliverer
      return this.resultValue(res, "get delevry   with success ", {
        delevryResult,
      });
    } catch (error) {}

    // return this.ok(res, "product created with success ok");
  }
}
