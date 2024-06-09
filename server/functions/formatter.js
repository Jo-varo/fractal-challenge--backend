export const formatOrder = (order) => {
  const selectedProducts = order.orderProducts.map((productOrder) => ({
    id: productOrder.Product.id,
    name: productOrder.Product.name,
    unitPrice: productOrder.Product.price,
    quantity: productOrder.quantity,
    totalPrice: productOrder.quantity * productOrder.Product.price,
  }));

  return {
    id: order.id,
    orderNo: order.orderNo,
    date: order.date,
    productsNo: order.productsNo,
    finalPrice: order.finalPrice,
    selectedProducts,
  };
}