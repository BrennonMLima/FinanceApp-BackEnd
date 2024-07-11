import { Router } from 'express';
import TransactionController from '../controller/transaction.controller';

const router = Router();
const transactionController = new TransactionController();

router.post('/', transactionController.createTransaction);
router.get('/group/:groupId', transactionController.getTransactionsByGroup);
router.get('/:id', transactionController.getTransactionById);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

export default router;
