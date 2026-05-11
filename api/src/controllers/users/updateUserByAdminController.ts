import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import Joi from "joi";
import { RequestAuth } from "../../middleware/verifyToken";

import canModifyUser from "../../Policy/CanBeModifyByUser";
import { ActorUserAdmin } from "../../dbConfig/configApp";
import updateUserByAdminUseCase from "../../useCases/userUseCase/updateUserByAdminUseCase";

export default class updateUserByAdminController extends BaseController {
  private _usecaseUpdayeUser!: updateUserByAdminUseCase;
  constructor(usecaseUpdateUser: updateUserByAdminUseCase) {
    super();

    this._usecaseUpdayeUser = usecaseUpdateUser;
  }

  protected async executeImpl(req: RequestAuth, res: Response): Promise<any> {
    //   const { firstName, lastName,email, address, phone ,city,role} = req.body;
    const { id } = req.params;
    const custmerId = Number(id);
    const actor: ActorUserAdmin = {
      actorId: Number(req.user?.id),
      actorEmail: req.user?.email,
      actorRole: req.user?.role,
    };

  

    try {
      const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        phone: Joi.string().min(6).max(20).required(),
        email: Joi.string().email().required(),
        //  password: Joi.string().min(6).required(),
        city: Joi.string().optional(),
        address: Joi.string().optional(),
        role: Joi.string()
          .valid("user", "admin", "supplier", "deliverer", "secrtrie")
          .optional(),
      });

      const { error, value } = schema.validate(req.body);
      if (error) return this.badRequest(res, error.details[0].message);
      //let role = value.role ? value.role : Role.USER;

      const { firstName, lastName, phone, email, city, address, role } = value;

      const dto = {
        custmerId,
        firstName,
        lastName,
        phone,
        email,
        city,
        address,
        role,
        actor,
      };

      if (!canModifyUser(actor, custmerId)) {
        return res
          .status(403)
          .json({ message: "Forbidden: you cannot update this user" });
      }



    
      const result = await this._usecaseUpdayeUser.execute(dto);

      if (!result.success) {
        return this.fail(res, result.message);
      }
      return this.resultValue(res, "user updated with success ",{ 
        id:result.user.id,
                      firstName:result.user.firstName,
                      lastName: result.user.lastName,
                      phone: result.user.phone,
                      role: result.user.role,
                      city:result.user.city,
                      address: result.user.address
                  }       
        );
    } catch (error) {
      console.log(error);
    }
  }
}
