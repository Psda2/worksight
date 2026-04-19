import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWorker extends Document {
  name: string;
  role: 'Worker' | 'Assistant' | 'Supervisor' | 'Team Leader';
  type: 'Permanent' | 'Ad-Hoc';
  skills: string[];
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

const WorkerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['Worker', 'Assistant', 'Supervisor', 'Team Leader'], 
      required: true,
      default: 'Worker'
    },
    type: { 
      type: String, 
      enum: ['Permanent', 'Ad-Hoc'], 
      required: true,
      default: 'Permanent'
    },
    skills: [{ type: String }],
    phone: { type: String }
  },
  { timestamps: true }
);

const Worker: Model<IWorker> = mongoose.models.Worker || mongoose.model<IWorker>('Worker', WorkerSchema);

export default Worker;
