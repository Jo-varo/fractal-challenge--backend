import * as ProductService from "../services/ProductService.js";

export const getProducts = async (req, res) => {
  try {
    const products = await ProductService.getProducts()

    return res.json({
      products,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
