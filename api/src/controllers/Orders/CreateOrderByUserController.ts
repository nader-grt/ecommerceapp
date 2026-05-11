import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import CreateOrderUseCase from "../../useCases/OrderUsecase/CreateOrderByUserUseCase";
import { RequestAuth } from "../../middleware/verifyToken";


export default class CreateOrderByUserController extends BaseController {
  private _createOrderUseCase!: CreateOrderUseCase;
  constructor(createOrderUseCase: CreateOrderUseCase) {
    super();

    this._createOrderUseCase = createOrderUseCase;
  }

  protected async executeImpl(req: RequestAuth, res: Response): Promise<any> {
    const { items } = req.body;

    const actor = {
      ownerId: req.user!.id,
      ownerRole: req.user!.role,
    };



    try {
      const dto = {
      //  custmerId: Number(customerId),
        items,
        actor,
      };
   const result =    await this._createOrderUseCase.execute(dto);


                    if(!result.success)
                    {
                       return this.fail(res,result.message)
                    }

                    return this.ok(res,result.message)
    } catch (error) {
      console.log(error);
    }
  }
}
