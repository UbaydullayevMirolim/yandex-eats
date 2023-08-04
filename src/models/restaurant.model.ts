import { Model, DataTypes } from "sequelize";
import { sequelize } from '../../config/db/connections';
import Food from "./food.model";

class Restaurant extends Model {
  public id!: number;
  public name!: string;
  public longtitude!: string;
  public openTo!: string;
  public closeTo!: string;
  public lattitude  !: string;
  public balance!: number;
  public image  !: string;
  public createdAt!: Date;
}

// ...lattitude

Restaurant.init(
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
    lattitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    openTo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    closeTo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longtitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    
    
  },
  {
    sequelize,
    modelName: 'restaurants',
    createdAt: "created_at",
  }
);

// ...

export const relation = ()=>{
    Restaurant.hasMany(Food ,{
        foreignKey:{
            name:"restaurant_id",
            allowNull: false,
        }
    }),
    Food.belongsTo(Restaurant ,{
        foreignKey:{
            name:"restaurant_id",
            allowNull: false,
        }
    })
}



export default Restaurant;
