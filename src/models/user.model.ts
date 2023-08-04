import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/db/connections";

class Users extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  // public role  !: string;
  public addres  !: string;
  public balance  !: string;
  public isVerify  !: boolean;
  public createdAt!: Date;
}


Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // role: {
    //   type: DataTypes.ENUM('admin', 'restaurant_admin', 'user'),
    //   allowNull: false,
    //   defaultValue: 'user', // "user" ro'li default qiymat sifatida qo'shildi
    // },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'users',
    createdAt: "created_at",
  }
);

// ...


export default Users;
