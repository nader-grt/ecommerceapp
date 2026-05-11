import { Sequelize, DataTypes, Model } from "sequelize";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  SUPPLIER = "SUPPLIER",
}










export default interface IDelivereryPerson {
  id?: number;
 // workingTime:string ;
  carType?:string;
  employeeId?:number;

}

export class DelivererPerson extends Model<IDelivereryPerson> implements IDelivereryPerson {
  public id!: number;
 // public daysOfWork!: number;
  public workingTime!:string;
  public employeeId!:number;


}



export function DelivererPersonModel(sequelize: Sequelize) {
  DelivererPerson.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    //  workingTime: { type: DataTypes.INTEGER, allowNull: false },
      carType: { type: DataTypes.STRING, allowNull: false },
      employeeId: { type: DataTypes.INTEGER, allowNull: false },
 
    },
    {
      sequelize,
      tableName: "deliverers",
      timestamps: true,
    }
  );

  return DelivererPerson;
}
