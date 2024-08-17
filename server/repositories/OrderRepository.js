import { Order, Product, ProductOrder } from '../models/models.js';

export const getOrder = async (id) => {
  return await Order.findByPk(id, {
    include: [
      {
        model: ProductOrder,
        as: 'orderProducts',
        attributes: ['productId', 'quantity'],
        include: {
          model: Product,
          as: 'Product',
          attributes: ['id', 'name', 'price'],
        },
      },
    ],
    attributes: ['id', 'orderNo', 'date', 'productsNo', 'finalPrice'],
  });
};

export const getOrders = async () => {
  return await Order.findAll({
    include: [
      {
        model: ProductOrder,
        as: 'orderProducts',
        attributes: ['productId', 'quantity'],
        include: {
          model: Product,
          as: 'Product',
          attributes: ['id', 'name', 'price'],
        },
      },
    ],
    attributes: ['id', 'orderNo', 'date', 'productsNo', 'finalPrice'],
  });
};

export const createOrder = async (body) => {
  const order = await Order.create({
    orderNo: body.orderNo,
    date: body.date,
    productsNo: body.productsNo,
    finalPrice: body.finalPrice,
  });

  await Promise.all(
    body.selectedProducts.map((product) =>
      ProductOrder.create({
        productId: product.id,
        orderId: order.id,
        quantity: product.quantity,
      })
    )
  );

  return order;
};

export const updateOrder = async (
  order,
  { orderNo, date, productsNo, finalPrice }
) => {
  return await order.update({
    orderNo,
    date,
    productsNo,
    finalPrice,
  });
};

export const getSimpleSingleOrder = async (id) => {
  return await Order.findByPk(id);
};

export const deleteOrder = async (order) => {
  return await order.destroy();
};
