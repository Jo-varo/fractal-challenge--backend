import { DataTypes } from "sequelize";
import sequelize from "../db.js";

export const ProductOrder = sequelize.define(
  'ProductOrder',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: 'product-orders' }
);
