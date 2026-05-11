import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import GetDayWorkNameUseCase from "../../useCases/DayWorkNameUseCase/GetDayWorkUseCase";

export default interface IResponseDayWeek {
  id: number;
  nameDay: string;
}

export default class GetDayWorkController extends BaseController {
  constructor(private getDayWorkUseCase: GetDayWorkNameUseCase) {
    super();
  }

  private getAllNameDays(workDay: IResponseDayWeek[]): IResponseDayWeek[] {
    const simpleDays: any = workDay.map((day) => ({
      id: day.id,
      nameDay: day.nameDay,
    }));
    // console.log("simpl   ",simpleDays)
    return simpleDays;
  }

  protected async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const result = await this.getDayWorkUseCase.execute();

      const resultNameDay: any = this.getAllNameDays(result);
      //  return this.ok(res, result);

      return this.resultValue(res, "all days in week ", resultNameDay);
    } catch (error) {
      console.log(error);
    }
  }
}
