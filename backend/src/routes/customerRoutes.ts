import { Router } from 'express';
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customerController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Protect all CRM routes with the authenticateToken middleware
router.use(authenticateToken as any);

router.get('/', getCustomers as any);
router.post('/', createCustomer as any);
router.put('/:id', updateCustomer as any);
router.delete('/:id', deleteCustomer as any);

export default router;