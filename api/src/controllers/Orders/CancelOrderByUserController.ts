import { BaseController } from "../../infra/BaseCOntroller";
import { Request, Response } from "express";
import CancelOrderByUserUseCase from "../../useCases/OrderUsecase/CancelOrderByUserUseCase";
import { RequestAuth } from "../../middleware/verifyToken";

export default class CancelOrderByUserController extends BaseController {
  private _cancelOrderByUserUseCase!: CancelOrderByUserUseCase;
  constructor(cancelOrderByUserUseCase: CancelOrderByUserUseCase) {
    super();

    this._cancelOrderByUserUseCase = cancelOrderByUserUseCase;
  }

  protected async executeImpl(req: RequestAuth, res: Response): Promise<any> {
              //orderId

                        const {orderId} = req.params
                          const actor = {
                            ownerId: req.user!.id,
                            ownerRole: req.user!.role
                      };

                     
    try {


                    const dto = {
                      orderId: Number(orderId),
                      actor

                    }


                    await this._cancelOrderByUserUseCase.execute(dto)
               
    } catch (error) {
      console.log(error);
    }
  }
}
