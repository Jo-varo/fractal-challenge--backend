import { Product } from "../models/models.js";

export const getProducts = async () => {
  return await Product.findAll({
    attributes: ['id', 'name', 'price'],
  });
};
