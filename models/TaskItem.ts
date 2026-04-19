import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITaskItem extends Document {
  projectId: mongoose.Types.ObjectId;
  name: string;
  assignedWorkers: mongoose.Types.ObjectId[];
  requiredHours: number;
  status: 'Pending' | 'In Progress' | 'Done';
  createdAt: Date;
  updatedAt: Date;
}

const TaskItemSchema: Schema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    name: { type: String, required: true },
    assignedWorkers: [{ type: Schema.Types.ObjectId, ref: 'Worker' }],
    requiredHours: { type: Number, required: true, default: 0 },
    status: { 
      type: String, 
      enum: ['Pending', 'In Progress', 'Done'], 
      default: 'Pending' 
    }
  },
  { timestamps: true }
);

const TaskItem: Model<ITaskItem> = mongoose.models.TaskItem || mongoose.model<ITaskItem>('TaskItem', TaskItemSchema);
export default TaskItem;
