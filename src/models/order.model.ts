import { DataTypes, Model } from "sequelize";
import { sequelize } from '../../config/db/connections';

class Order extends Model {
  public id!: number;
  public userId!: number;
  public restoranId!: number;
  public foodId!: number;
  public status!: "pending" | "delivered" | "delivering" | "denied";
  public balance!: string;
  public createdAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "delivered", "delivering", "denied"),
      allowNull: false,
      defaultValue: "pending",
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    sequelize,
    tableName: "orders",
  }
);

export default Order;
