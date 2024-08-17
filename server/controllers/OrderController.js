import * as OrderService from '../services/OrderService.js';

export const getOrder = async (req, res) => {
  try {
    const order = await OrderService.getSingleOrder(req.params.id);
    return res.json({
      order,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'An error has occurred' });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await OrderService.getOrders();
    return res.json({
      orders,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'An error has occurred' });
  }
};

export const createOrder = async (req, res) => {
  try {
    const order = await OrderService.createOrder(req.body);

    return res.status(201).json({
      order,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'An error has occurred' });
  }
};

export const editOrder = async (req, res) => {
  try {
    const order = await OrderService.editOrder(req.params.id, req.body);

    return res.status(202).json({
      order,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'An error has occurred' });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const message = await OrderService.deleteOrder(req.params.id);

    if (!message)
      throw CustomError({
        code: 10,
        message: "There's no message",
        status: 404,
      });

    return res.json({
      message,
    });
  } catch (error) {
    // Custom error path/validation
    if (error.code)
      return res.status(error.status).json({ message: error.message });

    console.log(error.message);
    return res.status(500).json({ message: 'An error has occurred' });
  }
};
