import { DataTypes } from "sequelize";
import sequelize from "../db.js";

export const Order = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    productsNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    finalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  { tableName: 'orders' }
);