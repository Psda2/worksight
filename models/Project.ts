import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  budgetLKR?: number;
  status: 'Planning' | 'Active' | 'Completed';
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budgetLKR: { type: Number, default: 0 },
    status: { 
      type: String, 
      enum: ['Planning', 'Active', 'Completed'], 
      default: 'Planning' 
    }
  },
  { timestamps: true }
);

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
export default Project;
