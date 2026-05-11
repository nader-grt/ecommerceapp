import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import { RequestAuth } from "../../middleware/verifyToken";
import DeleveryRepo from "../../repo/delevryPersonRepo/DeleveryPersonRepo";
import EmployeeRepo from "../../repo/employeeRepo/EmployeeRepo";

export default class UpdateDelevryPersonController extends BaseController {
  protected _DeleveryRepo: DeleveryRepo;

  constructor() {
    super();
    this._DeleveryRepo = new DeleveryRepo();
  }

  protected async executeImpl(req: RequestAuth, res: Response): Promise<any> {
    const { carType, employeeId } = req.body;

    try {
      const idsUserTypeRole: number[] =
        await EmployeeRepo.FindAllIdsExistWithEmp(); //index from table users

      const [idDeliverer, idSecrtrie] = idsUserTypeRole;

      if (!idDeliverer) {
        return this.notFound(res, " DelivererId    not fount by this  role ");
      }
      let delevryResult: any = await DeleveryRepo.FindDelevryById(
        Number(employeeId)
      );

      if (delevryResult === null) {
        return this.notFound(res, "delivery not found ");
      }

      if (carType) {
        delevryResult.carType = carType;
      }

      let delevryResultValue = await this._DeleveryRepo.UpdateDelevryByID(
        delevryResult,
        Number(delevryResult.id)
      );

      if (delevryResultValue) {
        return this.ok(res, " delevry updated ");
      }
      // }
    } catch (error) {
      console.log(error);
    }
  }
}
