import { Order, Product, ProductOrder } from '../models/models.js';
import { formatOrder } from '../functions/formatter.js';

export const getOrder = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const order = await Order.findByPk(id, {
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

    if (!order) throw new Error('Any product found with that id');

    return res.json({
      order: formatOrder(order),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
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

    const formattedOrders = orders.map((order) => formatOrder(order));

    return res.json({
      orders: formattedOrders,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const body = req.body;

    if (!body) throw new Error('Incorrect body');
    const order = await Order.create({
      orderNo: body.orderNo,
      date: body.date,
      productsNo: body.productsNo,
      finalPrice: body.finalPrice,
    });

    for (const selectedProduct of body.selectedProducts) {
      await ProductOrder.create({
        productId: selectedProduct.id,
        orderId: order.id,
        quantity: selectedProduct.quantity,
      });
    }

    return res.json({
      order,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editOrder = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const body = req.body;

    if (!body) throw new Error('Incorrect body');

    const productsInOrder = await ProductOrder.findAll({
      where: { orderId: id },
    });

    for (const selectedProductInBody of body.selectedProducts) {
      // Busca si el producto seleccionado está en la lista de productos de la orden
      let productInOrder = productsInOrder.find(
        (po) => po.productId === selectedProductInBody.id
      );

      if (productInOrder) {
        // Si el producto está en la orden, actualiza la cantidad y el precio total
        await productInOrder.update({
          quantity: selectedProductInBody.quantity,
          totalPrice: selectedProductInBody.totalPrice,
        });
      } else {
        // Si el producto no está en la orden, crea una nueva relación Order-Product
        await ProductOrder.create({
          productId: selectedProductInBody.id,
          orderId: id,
          quantity: selectedProductInBody.quantity,
          totalPrice: selectedProductInBody.totalPrice,
        });
      }
    }

    const order = await Order.findByPk(id);
    if (order) {
      await order.update({
        orderNo: body.orderNo,
        date: body.date,
        productsNo: body.productsNo,
        finalPrice: body.finalPrice,
      });
    } else {
      throw new Error('The order with the provided ID was not found.');
    }

    return res.json({
      order,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) throw new Error('An id must be provided');

    const productsInOrder = await ProductOrder.findAll({
      where: { orderId: id },
    });

    // Elimina cada relación Order-Product
    for (const productInOrder of productsInOrder) {
      await productInOrder.destroy();
    }

    // Elimina la orden principal
    const order = await Order.findByPk(id);
    if (order) {
      await order.destroy();
      return res.json({
        message: 'Succesful deleted',
      });
    } else {
      throw new Error('The order with the provided ID was not found.');
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price'],
    });

    return res.json({
      products,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
