import * as OrderRepository from '../repositories/OrderRepository.js';
import {
  createProductOrder,
  deleteProductOrder,
  getProductOrdersInOrder,
  updateQuantityPrice,
} from '../repositories/ProductOrderRepository.js';
import { formatOrder } from '../utils/formatter.js';

export const getSingleOrder = async (id) => {
  const order = await OrderRepository.getOrder(id);

  if (!order) throw new Error('Any product found with that id');

  return formatOrder(order);
};

export const getOrders = async () => {
  const orders = await OrderRepository.getOrders();

  return orders.map((order) => formatOrder(order));
};

export const createOrder = async (body) => {
  if (!body) throw new Error('Incorrect body');

  return await OrderRepository.createOrder(body);
};

export const editOrder = async (id, body) => {
  if (!body) throw new Error('Incorrect body');

  const productsInOrder = await getProductOrdersInOrder(id);

  // Iterates over DB to delete records
  await Promise.all(
    productsInOrder.map((productInOrder) => {
      const isProductInDB = body.selectedProducts.some(
        (selectedProductInBody) =>
          selectedProductInBody.id === productInOrder.productId
      );
      // If the product is not in the request it is deleted from the database
      if (!isProductInDB) return deleteProductOrder(productInOrder);
    })
  );

  // Iterates over products in request to create or update records
  await Promise.all(
    body.selectedProducts.map((productInRequest) => {
      // Search if the selected product is in the order's product list
      let productInOrder = productsInOrder.find(
        (po) => po.productId === productInRequest.id
      );

      if (productInOrder) {
        // If the product is in the order, update the quantity and total price
        return updateQuantityPrice(productInOrder, {
          quantity: productInRequest.quantity,
          totalPrice: productInRequest.totalPrice,
        });
      } else {
        // If the product is not in the order, create a new Order-Product relationship
        return createProductOrder({
          productId: productInRequest.id,
          orderId: id,
          quantity: productInRequest.quantity,
          totalPrice: productInRequest.totalPrice,
        });
      }
    })
  );

  const order = await OrderRepository.getSimpleSingleOrder(id);

  if (order) {
    await OrderRepository.updateOrder(order, {
      orderNo: body.orderNo,
      date: body.date,
      productsNo: body.productsNo,
      finalPrice: body.finalPrice,
    });
    return order;
  } else {
    throw new Error('The order with the provided ID was not found.');
  }
};

export const deleteOrder = async (id) => {
  if (!id) throw new Error('An id must be provided');

  const productsInOrder = await getProductOrdersInOrder(id);

  // Deletes each relation in Order-Product
  await Promise.all(
    productsInOrder.map((productInOrder) => deleteProductOrder(productInOrder))
  );

  // Deletes the main order
  const order = await OrderRepository.getOrder(id);
  if (!order) throw new Error('The order with the provided ID was not found.');

  await OrderRepository.deleteOrder(order);

  return 'Succesful deleted';
};
