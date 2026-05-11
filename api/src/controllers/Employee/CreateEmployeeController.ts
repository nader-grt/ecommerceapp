import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";

import { RequestAuth } from "../../middleware/verifyToken";

import CreateEmployeeUseCase from "../../useCases/EmployeeUseCase/CreateEmployeeUseCase";

export default interface IEmployeeRequest {
  salary: number;
  hiredAt: string;
  userIdRole: number;
}

export default class CreateEmployeeController extends BaseController {
  private usecase!: CreateEmployeeUseCase;
  constructor(createEmployeeUseCase: CreateEmployeeUseCase) {
    super();

    this.usecase = createEmployeeUseCase;
  }

  public async executeImpl(req: RequestAuth, res: Response): Promise<any> {
    const { salary, hiredAt, userId } = req.body;

    try {
      const result = await this.usecase.execute({ salary, hiredAt, userId });

      if (!result.success) {
        return this.fail(res, result.message);
      }

      return this.ok(res, result);
    } catch (error) {
      console.log(error);
    }
  }
}
