import mongoose, { Schema, Document } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  description?: string;
  members: mongoose.Types.ObjectId[]; 
  createdAt?: Date;
  updatedAt?: Date;
}

const GroupSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model<IGroup>('Group', GroupSchema);
