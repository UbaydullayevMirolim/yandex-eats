import { DataTypes, Model } from "sequelize";
import { sequelize } from '../../config/db/connections';

class Dostavka extends Model {
  public id!: number;
  public courierId!: number;
  public orderId!: number;
  public status!: string;
  public createdAt!: Date;
}

Dostavka.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    sequelize,
    tableName: "deliver",
  }
);

export default Dostavka;
