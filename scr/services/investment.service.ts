import Investment, { IInvestment } from '../models/investment.model';

class InvestmentService {
  public async createInvestment(group_id: string, objective: string, final_amount: number, location: string): Promise<IInvestment> {
    const newInvestment = new Investment({ group_id, objective, final_amount, current_amount: 0, location });
    return await newInvestment.save();
  }

  public async getInvestmentsByGroup(groupId: string): Promise<IInvestment[]> {
    return await Investment.find({ group_id: groupId }).exec();
  }

  public async getInvestmentById(investmentId: string): Promise<IInvestment | null> {
    return await Investment.findById(investmentId).exec();
  }

  public async updateInvestment(investmentId: string, updatedInvestment: Partial<IInvestment>): Promise<IInvestment | null> {
    return await Investment.findByIdAndUpdate(investmentId, updatedInvestment, { new: true }).exec();
  }
}

export default InvestmentService;
