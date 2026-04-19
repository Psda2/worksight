'use server';

import connectToDatabase from '@/lib/mongodb';
import Worker from '@/models/Worker';
import { revalidatePath } from 'next/cache';

export async function getWorkers() {
  await connectToDatabase();
  const workers = await Worker.find({}).sort({ createdAt: -1 }).lean();
  
  // Transform data explicitly to avoid transmitting Mongoose internal properties
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return workers.map((w: any) => ({
    ...w,
    _id: w._id.toString(),
    createdAt: w.createdAt?.toISOString(),
    updatedAt: w.updatedAt?.toISOString(),
    teams: w.teams?.map((t: any) => t.toString()) || []
  }));
}

export async function createWorker(data: { name: string; role: string; type: string; skills: string[]; phone?: string }) {
  await connectToDatabase();
  const worker = new Worker(data);
  await worker.save();
  revalidatePath('/workers');
  return { success: true, id: worker._id.toString() };
}
