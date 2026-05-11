import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";



//deliveries  with update status order
export default class DeliverOrderController extends BaseController {
  constructor() {
    super();
  }
  protected async executeImpl(req: Request, res: Response): Promise<any> {}
}
