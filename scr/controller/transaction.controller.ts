import { Request, Response } from 'express';
import TransactionService from '../services/transaction.service';
import { ITransaction } from '../models/transaction.model';

class TransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  public createTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const transactionData: ITransaction = req.body;
      
      const newTransaction = await this.transactionService.createTransaction(transactionData);

      res.status(201).json({ message: 'Transação criada com sucesso.', transaction: newTransaction });
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      res.status(500).json({ message: 'Erro interno ao criar transação.' });
    }
  };

  public getTransactionsByGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const groupId = req.params.groupId;
      const transactions = await this.transactionService.getTransactionsByGroup(groupId);

      res.status(200).json(transactions);
    } catch (error) {
      console.error('Erro ao buscar transações por grupo:', error);
      res.status(500).json({ message: 'Erro interno ao buscar transações por grupo.' });
    }
  };

  public getTransactionById = async (req: Request, res: Response): Promise<void> => {
    try {
      const transactionId = req.params.id;
      const transaction = await this.transactionService.getTransactionById(transactionId);

      if (!transaction) {
        res.status(404).json({ message: 'Transação não encontrada.' });
        return;
      }

      res.status(200).json(transaction);
    } catch (error) {
      console.error('Erro ao buscar transação por ID:', error);
      res.status(500).json({ message: 'Erro interno ao buscar transação por ID.' });
    }
  };

  public updateTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const transactionId = req.params.id;
      const updatedTransaction = req.body;

      const result = await this.transactionService.updateTransaction(transactionId, updatedTransaction);

      if (!result) {
        res.status(404).json({ message: 'Transação não encontrada.' });
        return;
      }

      res.status(200).json({ message: 'Transação atualizada com sucesso.', transaction: result });
    } catch (error) {
      console.error('Erro ao atualizar transação:', error);
      res.status(500).json({ message: 'Erro interno ao atualizar transação.' });
    }
  };

  public deleteTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const transactionId = req.params.id;

      await this.transactionService.deleteTransaction(transactionId);

      res.status(200).json({ message: 'Transação excluída com sucesso.' });
    } catch (error) {
      console.error('Erro ao excluir transação:', error);
      res.status(500).json({ message: 'Erro interno ao excluir transação.' });
    }
  };

}

export default TransactionController;
