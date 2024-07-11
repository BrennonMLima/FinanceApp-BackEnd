import mongoose, { Schema, Document } from 'mongoose';

export interface IInvestment extends Document {
  group_id: mongoose.Types.ObjectId;
  objective: string;
  final_amount: number;
  current_amount: number;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const InvestmentSchema: Schema = new Schema({
  group_id: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  objective: { type: String, required: true },
  final_amount: { type: Number, required: true },
  current_amount: { type: Number, required: true },
  location: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IInvestment>('Investment', InvestmentSchema);
