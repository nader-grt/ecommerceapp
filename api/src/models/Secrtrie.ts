import { Sequelize, DataTypes, Model } from "sequelize";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  SUPPLIER = "SUPPLIER",
}










export default interface ISecrtrie {
  id?: number;
 nbrAppointments:number;
  employeeId?:Number;


}

export class Secrtrie extends Model<ISecrtrie> implements ISecrtrie {
  public id!: number;
  public daysOfWork!: number;
  public   nbrAppointments!:number;
  public   employeeId!:Number;


}

/**
 * 
 * @param sequelize 
 * 
 * 
 * 


        employeeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true, //  
          references: {
            model: 'Employees',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
  
        // daysWorking: {
        //   type: Sequelize.STRING, // : "Sun-Mon-Tue"
        //   allowNull: false,
        // },
        canManageAppointments: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },,
    
    
    

 Employees
 * @returns 
 */

export function SecretaryModel(sequelize: Sequelize) {
    Secrtrie.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
 
      nbrAppointments: { type: DataTypes.INTEGER, defaultValue: 0 },
      employeeId: { type: DataTypes.INTEGER, allowNull: false },
 
    },
    {
      sequelize,
      tableName: "secrtries",
      timestamps: true,
    }
  );

  return Secrtrie;
}
