import { Sequelize, DataTypes, Model } from "sequelize";












export default interface IDayWork {
  id?: number;
  nameDay: string;
  

}

export class DayWork extends Model<IDayWork> implements IDayWork {
 // public id!: number;
  public nameDay!: string;



}


export function DayWorkModel(sequelize: Sequelize) {
  DayWork.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      nameDay: { type: DataTypes.STRING, allowNull: false,unique:true },
    
    },
    {
      sequelize,
      tableName: "dayWorks",
      timestamps: true,
    }
  );

  return DayWork;
}
