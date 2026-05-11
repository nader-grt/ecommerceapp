import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import DeleveryRepo from "../../repo/delevryPersonRepo/DeleveryPersonRepo";
import DeleveryWithDaysWorkDomain from "../../models/domain/DeleveryWithDaysWorkDomain/DeleveryWithDaysWorkDomain";
import IDelivererDayWork from "../../models/DelivererDayWork";
import DeleveryWithDaysWorkRepo from "../../repo/DeleveryWithDaysWorkRepo/DeleveryWithDaysWorkRepo";

export default class CreateDelivererDayWorkController extends BaseController {
  private _deleveryRepo: DeleveryRepo;
  private _deleveryWithDaysWorkDomain: DeleveryWithDaysWorkDomain;
  private _deleveryWithDaysWorkRepo: DeleveryWithDaysWorkRepo;
  private ReadDeliveryDayWork(deliveryDay: IDelivererDayWork) {
    const deleiveryDayWork = new DeleveryWithDaysWorkDomain();

    deleiveryDayWork.setNbrHours = Number(deliveryDay.nbrHours);
    deleiveryDayWork.setDelivererId = Number(deliveryDay.delivererid);
    deleiveryDayWork.setDayWorkid = Number(deliveryDay.dayWorkid);
    return deleiveryDayWork;
  }

  constructor() {
    super();
    this._deleveryRepo = new DeleveryRepo();
    this._deleveryWithDaysWorkDomain = new DeleveryWithDaysWorkDomain();
    this._deleveryWithDaysWorkRepo = new DeleveryWithDaysWorkRepo();
  }

  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const { nbrHours, dayWorkid } = req.body;
    const { delivererid } = req.params; //delivererid
    const id = Number(delivererid);
    let delevery: null | any;
    let deliveryDayWork: IDelivererDayWork | any = null;

    try {
      const dtoDeliverDay: any = {
        nbrHours,
        dayWorkid,
        delivererid,
      };
      delevery = await this._deleveryRepo.GetDelevryByID(Number(id));

      if (delevery === null || delevery === undefined) {
        return this.notFound(res, "delevery not found ");
      }
      console.log("  before reaaddddddd  ", dtoDeliverDay);
      deliveryDayWork = this.ReadDeliveryDayWork(dtoDeliverDay);

      const exist: boolean | any =
        await DeleveryWithDaysWorkRepo.FindDelivererDayWorkBefore(
          +delivererid,
          dayWorkid
        );

      //    console.log("eeeeeeeeeeeeeeeee   ",exist )

      if (exist) {
        return this.notFound(res, "this day exist before ");
      }
      const resulDeliveryDay =
        await this._deleveryWithDaysWorkRepo.CreateDeleveryWithDaysWork(
          deliveryDayWork
        );
      if (resulDeliveryDay) {
        console.log("result \t\t", resulDeliveryDay);
        return this.ok(res, "create with success ");
      }
    } catch (error) {
      console.log(Error);
    }
  }
}
