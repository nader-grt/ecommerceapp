import { Sequelize, DataTypes, Model } from "sequelize";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  SUPPLIER = "SUPPLIER",
}










export default interface IEmployee {
  id?: number;
  salary?: number;
  hiredAt:Date ;
  userId?:number;

}

export class Employees extends Model<IEmployee> implements IEmployee {
  public id!: number;
  public salary!: number;
  public hiredAt!:Date;
  public userId!: number;


}


export function EmployeesModel(sequelize: Sequelize) {
    Employees.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      salary: { type: DataTypes.DOUBLE, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      hiredAt: { type: DataTypes.DATE, allowNull: false },
 
    },
    {
      sequelize,
      tableName: "Employees",
      timestamps: true,
    }
  );

  return Employees;
}
