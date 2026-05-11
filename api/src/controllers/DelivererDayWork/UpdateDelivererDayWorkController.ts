import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import DeleveryRepo from "../../repo/delevryPersonRepo/DeleveryPersonRepo";
import DeleveryWithDaysWorkDomain from "../../models/domain/DeleveryWithDaysWorkDomain/DeleveryWithDaysWorkDomain";
import DeleveryWithDaysWorkRepo from "../../repo/DeleveryWithDaysWorkRepo/DeleveryWithDaysWorkRepo";
import DayWorkRepo from "../../repo/dayWorkRepo/DayWorkRepo";
import Joi from "joi";

export default class UpdateDelivererDayWorkController extends BaseController {
  private _deleveryRepo: DeleveryRepo;
  private _deleveryWithDaysWorkDomain: DeleveryWithDaysWorkDomain;
  private _deleveryWithDaysWorkRepo: DeleveryWithDaysWorkRepo;

  constructor() {
    super();
    this._deleveryRepo = new DeleveryRepo();
    this._deleveryWithDaysWorkDomain = new DeleveryWithDaysWorkDomain();
    this._deleveryWithDaysWorkRepo = new DeleveryWithDaysWorkRepo();
  }
  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const { nbrHours, dayWorkid } = req.body;
    const { delivererid, oldDayWorkid } = req.params; //delivererid
    const id = Number(delivererid);
    const oldNameDayId = Number(oldDayWorkid);
    let delivery: any = null;
    let nameDayWork: any = null;
    let resultUpdateDelivery: boolean = false;

    // console.log(" update day delivery **    ",{    nbrHours , dayWorkid   },"idd delivery  ",id)

    const newDeliveryDto: any = {
      // validation make validation withjoi library day work from 1 to 7  and nbrHours from 1 to 24 by one function
      nbrHours,
      dayWorkid,
    };

    const validationResult = this.validateDelivery(newDeliveryDto);

    try {
      delivery = await DeleveryRepo.FindDelevryById(id);

      console.log("delivery  here   ", delivery);

      if (delivery === null) {
        return this.notFound(res, "delivery not exist yet ");
      }
      nameDayWork = await DayWorkRepo.FindNameDayByWorkDayId(oldNameDayId);

      console.log(" nameDayWork ", nameDayWork);
      if (nameDayWork === null) {
        return this.notFound(res, "nameDayWork  not exist yet ");
      }

      if (!validationResult.isValid) {
        return res.status(400).json({ errors: validationResult.errors });
      } else {
        //  console.log('Validation:', validationResult.value);

        resultUpdateDelivery =
          await this._deleveryWithDaysWorkRepo.UpdateDeleveryWithDaysWork(
            validationResult.value,
            id,
            oldNameDayId
          );
      }

      if (resultUpdateDelivery) {
        return this.ok(res, "update with success ");
      }

      return this.fail(res, " failed  ");
    } catch (error) {
      console.log(error);
    }
  }

  private validateDelivery(dto: { dayWorkid: number; nbrHours: number }) {
    const deliverySchema = Joi.object({
      dayWorkid: Joi.number().integer().min(1).max(7).required().messages({
        "number.base": "dayWorkid must be a number",
        "number.min": "dayWorkid must be at least 1",
        "number.max": "dayWorkid must be at most 7",
        "any.required": "dayWorkid is required",
      }),
      nbrHours: Joi.number().integer().min(1).max(24).required().messages({
        "number.base": "nbrHours must be a number",
        "number.min": "nbrHours must be at least 1",
        "number.max": "nbrHours must be at most 24",
        "any.required": "nbrHours is required",
      }),
    });
    const { error, value } = deliverySchema.validate(dto, {
      abortEarly: false,
    });
    if (error) {
      return {
        isValid: false,
        errors: error.details.map((d) => d.message),
      };
    }
    return { isValid: true, value };
  }
}
