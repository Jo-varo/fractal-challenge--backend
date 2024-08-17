import { Product } from './product.js';
import { ProductOrder } from './productOrder.js';
import { Order } from './order.js';

Product.hasMany(ProductOrder, { as: 'productOrders', foreignKey: 'productId' });
Order.hasMany(ProductOrder, { as: 'orderProducts', foreignKey: 'orderId' });

ProductOrder.belongsTo(Product, { foreignKey: 'productId' });
ProductOrder.belongsTo(Order, { foreignKey: 'orderId' });

export { Product, Order, ProductOrder };
