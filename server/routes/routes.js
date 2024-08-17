import { Router } from 'express';
import * as OrderController from '../controllers/OrderController.js';
import * as ProductController from '../controllers/ProductController.js';

const router = Router();

router.get('/orders', OrderController.getOrders);
router.get('/orders/:id', OrderController.getOrder);
router.post('/orders', OrderController.createOrder);
router.patch('/orders/:id', OrderController.editOrder);
router.delete('/orders/:id', OrderController.deleteOrder);

router.get('/products', ProductController.getProducts);

export default router;
