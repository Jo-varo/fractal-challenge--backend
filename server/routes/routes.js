import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrder,
  getProducts,
  editOrder,
  deleteOrder,
} from '../controllers/controllers.js';

const router = Router();

router.get('/orders', getOrders);
router.get('/orders/:id', getOrder);
router.post('/orders', createOrder);
router.patch('/orders/:id', editOrder);
router.delete('/orders/:id', deleteOrder);
router.get('/products', getProducts);

export default router;
