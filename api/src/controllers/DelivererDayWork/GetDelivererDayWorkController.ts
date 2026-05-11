import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import DeleveryRepo from "../../repo/delevryPersonRepo/DeleveryPersonRepo";
import DeleveryWithDaysWorkRepo from "../../repo/DeleveryWithDaysWorkRepo/DeleveryWithDaysWorkRepo";

export default class GetDelivererDayWorkController extends BaseController {
  private _deleveryWithDaysWorkRepo: DeleveryWithDaysWorkRepo;

  private getDeliveryInfos(resultDelivery: any[]): any {
    if (!resultDelivery || resultDelivery.length === 0) return null;

    const days: any = [];
    let memo: any = {};

    for (const item of resultDelivery) {
      if (item.DayOfWorkDelivery) {
        if (item.DayOfWorkDelivery) {
          days.push({
            nameDay: item.DayOfWorkDelivery,
            hourDay: item.DeliveryNbrHours,
          });
        }
      }

      memo = { ...item };
    }

    memo.DayOfWorkDelivery = days;

    return memo;
  }

  constructor() {
    super();
    this._deleveryWithDaysWorkRepo = new DeleveryWithDaysWorkRepo();
  }

  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const { delivererid } = req.params; //delivererid
    const id = Number(delivererid);
    let delivery: any;
    try {
      delivery = await DeleveryRepo.FindDelivery(id);

      // console.log("dddddddddddd  get delivery ",delivery)
      if (delivery === null) {
        return this.notFound(res, "not found delivery ");
      }
      const resul = await this._deleveryWithDaysWorkRepo.GetDeliveryAllInfo();

      const r2: any = resul.filter((e: any) => Number(e.DeliveryNbrHours) > 0);

      const resultDelivery = this.getDeliveryInfos(r2);
      this.resultValue(res, "delivery with days  success ", resultDelivery);
    } catch (error) {
      console.log(error);
    }
  }
}
