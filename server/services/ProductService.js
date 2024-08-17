import * as ProductRepository from "../repositories/ProductRepository.js";

export const getProducts = async () => {
  return await ProductRepository.getProducts();
};
