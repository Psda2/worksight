'use server';

import connectToDatabase from '@/lib/mongodb';
import TaskItem from '@/models/TaskItem';
import WorkLog from '@/models/WorkLog';
import { revalidatePath } from 'next/cache';

export async function getActiveTasks() {
  await connectToDatabase();
  const tasks = await TaskItem.find({ status: { $ne: 'Done' } }).populate('assignedWorkers').lean();
  return JSON.parse(JSON.stringify(tasks));
}

export async function logWork(data: { taskId: string; logs: { workerId: string; hours: number }[]; date: string }) {
  await connectToDatabase();
  const dateObj = new Date(data.date);
  
  const workLogs = data.logs.map(log => ({
    taskId: data.taskId,
    workerId: log.workerId,
    hoursLogged: log.hours,
    date: dateObj
  }));

  await WorkLog.insertMany(workLogs);
  revalidatePath('/tracking');
  return { success: true };
}
