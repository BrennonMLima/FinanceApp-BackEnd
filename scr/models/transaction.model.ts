import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  group_id: mongoose.Types.ObjectId;
  responsible_id: mongoose.Types.ObjectId;
  payment_method: string;
  category: string;
  description: string;
  date: Date;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const TransactionSchema: Schema = new Schema({
  group_id: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  responsible_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  payment_method: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: false },
  date: { type: Date, required: true },
  amount: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
