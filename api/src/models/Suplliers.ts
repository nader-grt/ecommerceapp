import { Sequelize, DataTypes, Model } from "sequelize";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  SUPPLIER = "SUPPLIER",
}










export default interface ISupllier {
  id?: number;
  companyName?: string;
  companyPhone:String;
  companyEmail:String;
 // address:String;
  contactPerson:String;
  employeeId?:Number;
  userId?:number;


}

export class Supllier extends Model<ISupllier> implements ISupllier {
  public id!: number;
  public companyName!: string;
  public   companyPhone!:String;
  public   companyEmail!:String;
 // public   address!:String;
  public   contactPerson!:String;
  public userId!: number;


}


export function SupplierModel(sequelize: Sequelize) {
    Supllier.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      companyName: { type: DataTypes.STRING, allowNull: false },
      companyPhone: { type: DataTypes.STRING, allowNull: false },
      companyEmail: { type: DataTypes.STRING, allowNull: false },
      //address
   //   address: { type: DataTypes.STRING, allowNull: false },
   userId: { type: DataTypes.INTEGER, allowNull: false },
      contactPerson: { type: DataTypes.STRING, allowNull: false },
 
    },
    {
      sequelize,
      tableName: "suplliers",
      timestamps: true,
    }
  );

  return Supllier;
}
