import fs from 'fs';
import mongoose from 'mongoose';

async function run() {
  try {
    const envFile = fs.readFileSync('.env.local', 'utf8');
    const match = envFile.match(/MONGODB_URI=["']?(.*?)["']?(\n|$)/);
    if (!match) throw new Error("No MONGODB_URI found");
    const uri = match[1];
    
    console.log("Testing connection...");
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("SUCCESS: Connected to MongoDB!");
  } catch (e) {
    console.error("ERROR:", e.message);
  } finally {
    process.exit();
  }
}

run();
