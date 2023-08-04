import { DataTypes, Model } from "sequelize";
import { sequelize } from '../../config/db/connections';

class Admin extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "admin",
  }
);

export default Admin;
