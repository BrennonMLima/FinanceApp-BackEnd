import express from 'express';
import InvestmentController from '../controller/investment.controller';
import protectedRoute from '../security/guard';

const router = express.Router();
const investmentController = new InvestmentController();

router.post('/', protectedRoute, investmentController.createInvestment);
router.get('/group/:groupId',protectedRoute, investmentController.getInvestmentsByGroup);
router.get('/:id',protectedRoute, investmentController.getInvestmentById);
router.put('/:id',protectedRoute, investmentController.updateInvestment);

export default router;
