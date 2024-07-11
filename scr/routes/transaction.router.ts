import { Router } from 'express';
import TransactionController from '../controller/transaction.controller';
import protectedRoute from '../security/guard';

const router = Router();
const transactionController = new TransactionController();

router.post('/',protectedRoute, transactionController.createTransaction);
router.get('/group/:groupId',protectedRoute, transactionController.getTransactionsByGroup);
router.get('/:id',protectedRoute, transactionController.getTransactionById);
router.put('/:id',protectedRoute, transactionController.updateTransaction);
router.delete('/:id',protectedRoute, transactionController.deleteTransaction);

export default router;
