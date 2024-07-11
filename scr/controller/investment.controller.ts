import { Request, Response } from 'express';
import InvestmentService from '../services/investment.service';

class InvestmentController {
  private investmentService: InvestmentService;

  constructor() {
    this.investmentService = new InvestmentService();
  }

  public createInvestment = async (req: Request, res: Response): Promise<void> => {
    try {
      const { group_id, objective, final_amount, location } = req.body;

      const newInvestment = await this.investmentService.createInvestment(group_id, objective, final_amount, location);

      res.status(201).json({ message: 'Investimento criado com sucesso.', investment: newInvestment });
    } catch (error) {
      console.error('Erro ao criar investimento:', error);
      res.status(500).json({ message: 'Erro interno ao criar investimento.' });
    }
  };

  public getInvestmentsByGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const groupId = req.params.groupId;
      const investments = await this.investmentService.getInvestmentsByGroup(groupId);

      res.status(200).json(investments);
    } catch (error) {
      console.error('Erro ao buscar investimentos por grupo:', error);
      res.status(500).json({ message: 'Erro interno ao buscar investimentos por grupo.' });
    }
  };

  public getInvestmentById = async (req: Request, res: Response): Promise<void> => {
    try {
      const investmentId = req.params.id;
      const investment = await this.investmentService.getInvestmentById(investmentId);

      if (!investment) {
        res.status(404).json({ message: 'Investimento não encontrado.' });
        return;
      }

      res.status(200).json(investment);
    } catch (error) {
      console.error('Erro ao buscar investimento por ID:', error);
      res.status(500).json({ message: 'Erro interno ao buscar investimento por ID.' });
    }
  };

  public updateInvestment = async (req: Request, res: Response): Promise<void> => {
    try {
      const investmentId = req.params.id;
      const updatedInvestment = req.body;

      const result = await this.investmentService.updateInvestment(investmentId, updatedInvestment);

      res.status(200).json({ message: 'Investimento atualizado com sucesso.', investment: result });
    } catch (error) {
      console.error('Erro ao atualizar investimento:', error);
      res.status(500).json({ message: 'Erro interno ao atualizar investimento.' });
    }
  };

}

export default InvestmentController;
