import Transaction, { ITransaction } from '../models/transaction.model';

class TransactionService {
    public async createTransaction(transactionData: ITransaction): Promise<ITransaction> {
        const newTransaction = new Transaction(transactionData);
        return await newTransaction.save();
    }

    public async getTransactionsByGroup(groupId: string): Promise<ITransaction[]> {
        return await Transaction.find({ group_id: groupId }).exec();
    }

    public async getTransactionById(transactionId: string): Promise<ITransaction | null> {
        return await Transaction.findById(transactionId).exec();
    }

    public async updateTransaction(transactionId: string, updatedTransaction: Partial<ITransaction>): Promise<ITransaction | null> {
        return  Transaction.findByIdAndUpdate(transactionId, updatedTransaction, { new: true }).exec();
    }
    
    public async deleteTransaction(transactionId: string): Promise<void> {
        await Transaction.findByIdAndDelete(transactionId).exec();
    }

}

export default TransactionService;
