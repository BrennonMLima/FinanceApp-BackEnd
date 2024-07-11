import express from 'express';
import InvestmentController from '../controller/investment.controller';

const router = express.Router();
const investmentController = new InvestmentController();

router.post('/', investmentController.createInvestment);
router.get('/group/:groupId', investmentController.getInvestmentsByGroup);
router.get('/:id', investmentController.getInvestmentById);
router.put('/:id', investmentController.updateInvestment);

export default router;
