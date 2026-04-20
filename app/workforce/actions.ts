'use server';

import connectToDatabase from '@/lib/mongodb';
import Worker from '@/models/Worker';
import TaskItem from '@/models/TaskItem';
import WorkLog from '@/models/WorkLog';

export async function getWorkerStatus() {
  await connectToDatabase();

  // Get all workers
  const allWorkers = await Worker.find({}).lean();

  // Get all active (non-Done) tasks with assigned workers
  const activeTasks = await TaskItem.find({ status: { $ne: 'Done' } })
    .populate('assignedWorkers')
    .lean();

  // Get all Done tasks with their required hours vs actual hours logged
  const doneTasks = await TaskItem.find({ status: 'Done' }).lean();

  // Build a set of worker IDs currently assigned to active tasks
  const busyWorkerIds = new Set<string>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const workerTaskMap: Record<string, any[]> = {};

  for (const task of activeTasks) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const w of (task.assignedWorkers as any[])) {
      const id = w._id.toString();
      busyWorkerIds.add(id);
      if (!workerTaskMap[id]) workerTaskMap[id] = [];
      workerTaskMap[id].push({ taskName: task.name });
    }
  }

  // Find workers who finished tasks early (actual hours < required hours) 
  // by looking at completed tasks and cross-checking WorkLog totals
  const earlyFinisherIds = new Set<string>();

  for (const task of doneTasks) {
    const logsForTask = await WorkLog.find({ taskId: task._id }).lean();
    const totalLogged = logsForTask.reduce((sum, l) => sum + l.hoursLogged, 0);

    if (totalLogged < task.requiredHours && totalLogged > 0) {
      // Every worker who contributed to this efficiently-completed task is an early finisher
      for (const log of logsForTask) {
        earlyFinisherIds.add(log.workerId.toString());
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const workers = allWorkers.map((w: any) => {
    const id = w._id.toString();
    return {
      _id: id,
      name: w.name,
      role: w.role,
      type: w.type,
      isBusy: busyWorkerIds.has(id),
      currentTasks: workerTaskMap[id] || [],
      isEarlyFinisher: earlyFinisherIds.has(id),
    };
  });

  return JSON.parse(JSON.stringify(workers));
}
