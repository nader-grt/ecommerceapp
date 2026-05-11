import { Sequelize } from "sequelize";
import { DelivererPerson, Employee, sequelize, User } from "../../models/main";
import IDelevryPersonRepo from "./IDelevryPersonRepo";



export default class DeleveryPersonRepo extends IDelevryPersonRepo {
  public async createDelevry(delevry: any): Promise<any> {
    try {
      const deliverer2 = await DelivererPerson.create(delevry);

      // const employee = await Employee.findOne({
      //     where: { userId: delevry.employeeId }
      //   });

      //   if (!employee) {
      //     throw new Error("Employee not found for this user");
      //   }

      //   const deliverer = await Deliverer.create({
      //     workingTime: delevry.workingTime,
      //     carType: delevry.carType,
      //     employeeId: employee.id,
      //   });

      return deliverer2;
    } catch (error) {
      console.log(error);
    }
  }

  public async GetDelevryByID(id: number): Promise<any> {
    const delivery = await DelivererPerson.findOne({
      where: { id: id },
      raw: true,
    });
    if (delivery) {
      return delivery;
    }
    return null;
  }

  public async DeleteDelevryByID(
    delevryid: number,
    empId?: number,
    userid?: number
  ): Promise<any> {
    const t = await sequelize.transaction();

    try {
      if (delevryid) {
        await DelivererPerson.destroy({ where: { id: delevryid }, transaction: t });
      }

      if (empId) {
        await Employee.destroy({ where: { id: empId }, transaction: t });
      }

      if (userid) {
        await User.destroy({ where: { id: userid }, transaction: t });
      }

      await t.commit();
      //  return { success: true, message: "Deleted successfully" };
    } catch (error) {
      await (await t).rollback();
      console.log(error);
    }
  }

  public async UpdateDelevryByID(
    delevry: any,
    delevryid: number
  ): Promise<any> {
    try {
      const delevryResult = await DelivererPerson.update(
        {
          carType: delevry.carType,
          employeeId: delevry.deliveryEmployeeId,
        },
        { where: { id: delevryid } }
      );

      if (delevryResult) {
        return delevryResult;
      }
      return null;
      //   return await Deliverer.findByPk(delevryid);
    } catch (error) {}
  }

  static async FindDelevryById(id: number): Promise<any> {
    try {
      const result = await DelivererPerson.findOne({
        where: { employeeId: id },
        raw: true,
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async getUserDelevredById(id?: number): Promise<any> {
    try {
      const result = await Employee.findAll({
        attributes: [["id", "EmployeeID"], "salary", "userId"],
        include: [
          {
            model: User,
            as: "user",
            attributes: [["id", "UserID"], "firstName", "role"],
            required: false,
          },
        ],
        raw: true,
      });

      return result.filter((e: any) => e?.EmployeeID === id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getEmployeeIsDelevredById(id: number): Promise<any> {
    try {
      const result = await User.findOne({
        where: { id: id },
        attributes: [["id", "TusersID"], "role", "firstName"],
        include: [
          {
            association: "employee", //
            attributes: [["id", "TempID"]],
            required: true,
          },
        ],
      });

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async FindDelivery(id: number): Promise<any> {
    try {
      const resulteDelivery = await DelivererPerson.findOne({
        where: { id },
        raw: true,
      });
      if (!resulteDelivery) return null;

      return resulteDelivery;
    } catch (error) {
      console.log(error);
    }
  }
}
