'use server';

import connectToDatabase from '@/lib/mongodb';
import Worker from '@/models/Worker';
import Project from '@/models/Project';
import TaskItem from '@/models/TaskItem';
import WorkLog from '@/models/WorkLog';

export async function getDashboardMetrics() {
  await connectToDatabase();

  const totalWorkers = await Worker.countDocuments();
  const activeProjects = await Project.countDocuments({ status: 'Active' });
  const allProjects = await Project.find({}).sort({ createdAt: -1 }).limit(5).lean();
  
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const logsToday = await WorkLog.aggregate([
    { $match: { date: { $gte: startOfDay } } },
    { $group: { _id: null, totalHours: { $sum: "$hoursLogged" } } }
  ]);
  const hoursToday = logsToday.length > 0 ? logsToday[0].totalHours : 0;

  // Planned vs Actual Global
  const tasksConfig = await TaskItem.aggregate([
    { $group: { _id: null, totalPlanned: { $sum: "$requiredHours" } } }
  ]);
  const totalPlanned = tasksConfig.length > 0 ? tasksConfig[0].totalPlanned : 0;

  const allLogs = await WorkLog.aggregate([
    { $group: { _id: null, totalActual: { $sum: "$hoursLogged" } } }
  ]);
  const totalActual = allLogs.length > 0 ? allLogs[0].totalActual : 0;

  return {
    totalWorkers,
    activeProjects,
    hoursToday,
    totalPlanned,
    totalActual,
    recentProjects: JSON.parse(JSON.stringify(allProjects))
  };
}
