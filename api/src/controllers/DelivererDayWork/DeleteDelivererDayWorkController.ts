import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import DayWorkRepo from "../../repo/dayWorkRepo/DayWorkRepo";
import DeleveryRepo from "../../repo/delevryPersonRepo/DeleveryPersonRepo";
import DeleveryWithDaysWorkRepo from "../../repo/DeleveryWithDaysWorkRepo/DeleveryWithDaysWorkRepo";

export default class DeleteDelivererDayWorkController extends BaseController {
  private _deleveryWithDaysWorkRepo: DeleveryWithDaysWorkRepo;
  constructor() {
    super();
    this._deleveryWithDaysWorkRepo = new DeleveryWithDaysWorkRepo();
  }

  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const { delivererid, dayWorkid } = req.params; //delivererid
    const id = Number(delivererid);
    const oldNameDayId = Number(dayWorkid);
    let delivery: any = null;
    let nameDayWork: any = null;
    let resultDeleteDelivery: boolean = false;

    try {
      delivery = await DeleveryRepo.FindDelevryById(id);

      console.log("delivery  here  ***dddddddddddde ", delivery);
      if (delivery === null) {
        return this.notFound(res, "delivery not exist yet ");
      }
      nameDayWork = await DayWorkRepo.FindNameDayByWorkDayId(oldNameDayId);

      console.log(" nameDayWork ****", nameDayWork);
      if (nameDayWork === null) {
        return this.notFound(res, "nameDayWork  not exist yet ");
      }

      resultDeleteDelivery =
        await this._deleveryWithDaysWorkRepo.DeleteDeleveryWithDaysWork(
          id,
          oldNameDayId
        );

      if (resultDeleteDelivery) {
        return this.ok(res, "delete  with success ");
      }

      return this.fail(res, " failed  ");
    } catch (error) {
      console.log(error);
    }
  }
}
