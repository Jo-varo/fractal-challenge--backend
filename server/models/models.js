import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Product = sequelize.define(
  'Product',
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
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  { tableName: 'products' }
);

const Order = sequelize.define(
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

const ProductOrder = sequelize.define(
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

Product.hasMany(ProductOrder, { as: 'productOrders', foreignKey: 'productId' });
Order.hasMany(ProductOrder, { as: 'orderProducts', foreignKey: 'orderId' });

ProductOrder.belongsTo(Product, { foreignKey: 'productId' });
ProductOrder.belongsTo(Order, { foreignKey: 'orderId' });

export { Product, Order, ProductOrder };
