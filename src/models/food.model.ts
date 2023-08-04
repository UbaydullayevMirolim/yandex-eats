import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/db/connections";

class Food extends Model {
  public id!: number;
  public name!: string;
  public price!: string;
  public image  !: string;

}

// ...

Food.init(
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
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  },
  {
    sequelize,
    modelName: 'foods',
  }
);

// ...


export default Food;
