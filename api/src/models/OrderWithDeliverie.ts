import { DataTypes, Model, Sequelize } from "sequelize";

enum DELIVERY_STATUS {
  PENDING_PICKUP = "PENDING_PICKUP",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

interface IOrderWithDeliverie {
  id?: number;
  orderId: number;
  deliveryPersonId: number;
  status: DELIVERY_STATUS;
  pickedUpAt: Date;
  deliveredAt: Date;
}

export class OrderWithDeliverie
  extends Model<IOrderWithDeliverie>
  implements IOrderWithDeliverie
{
  public id!: number;
  public orderId!: number;
  public deliveryPersonId!: number;
  public status!: DELIVERY_STATUS;
  public pickedUpAt!: Date;
  public deliveredAt!: Date;
}

export function OrderWithDeliverieModel(sequelize: Sequelize) {
  OrderWithDeliverie.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      pickedUpAt: { type: DataTypes.DATE, allowNull: false },
      deliveredAt: { type: DataTypes.DATE, allowNull: false },
      orderId: { type: DataTypes.INTEGER, allowNull: false },
      deliveryPersonId: { type: DataTypes.INTEGER, allowNull: true },

      status: {
        type: DataTypes.ENUM(
          "PENDING_PICKUP",
          "IN_TRANSIT",
          "DELIVERED",
          "CANCELLED"
        ),
        allowNull: false,
        defaultValue: "PENDING_PICKUP",
      },
    },
    {
      sequelize,
      tableName: "DeliverieOrders",
      timestamps: true,
    }
  );

  return OrderWithDeliverie;
}
