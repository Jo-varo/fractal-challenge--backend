import { ProductOrder } from '../models/productOrder.js';

export const getProductOrdersInOrder = async (orderId) => {
  return await ProductOrder.findAll({
    where: { orderId },
  });
};

export const deleteProductOrder = async (productOrder) => {
  return await productOrder.destroy();
};

export const updateQuantityPrice = async (
  productOrder,
  { quantity, totalPrice }
) => {
  return await productOrder.update({
    quantity,
    totalPrice,
  });
};

export const createProductOrder = async ({
  productId,
  orderId,
  quantity,
  totalPrice,
}) => {
  return ProductOrder.create({
    productId,
    orderId,
    quantity,
    totalPrice,
  });
};
