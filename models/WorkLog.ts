import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWorkLog extends Document {
  taskId: mongoose.Types.ObjectId;
  workerId: mongoose.Types.ObjectId;
  date: Date;
  hoursLogged: number;
  createdAt: Date;
  updatedAt: Date;
}

const WorkLogSchema: Schema = new Schema(
  {
    taskId: { type: Schema.Types.ObjectId, ref: 'TaskItem', required: true },
    workerId: { type: Schema.Types.ObjectId, ref: 'Worker', required: true },
    date: { type: Date, required: true, default: Date.now },
    hoursLogged: { type: Number, required: true, min: 0, max: 24 }
  },
  { timestamps: true }
);

const WorkLog: Model<IWorkLog> = mongoose.models.WorkLog || mongoose.model<IWorkLog>('WorkLog', WorkLogSchema);
export default WorkLog;
