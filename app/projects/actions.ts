'use server';

import connectToDatabase from '@/lib/mongodb';
import Project from '@/models/Project';
import TaskItem from '@/models/TaskItem';
import { revalidatePath } from 'next/cache';

export async function getProjects() {
  await connectToDatabase();
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(projects));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createProject(data: any) {
  await connectToDatabase();
  const project = new Project(data);
  await project.save();
  revalidatePath('/projects');
  return { success: true };
}

export async function getTasksByProject(projectId: string) {
  await connectToDatabase();
  const tasks = await TaskItem.find({ projectId }).populate('assignedWorkers').sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(tasks));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createTask(data: any) {
  await connectToDatabase();
  const task = new TaskItem(data);
  await task.save();
  revalidatePath('/projects');
  return { success: true };
}
