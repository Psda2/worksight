import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hayleys_worksight';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Custom DNS-over-HTTPS SRV Resolver
 * Completely bypasses ISP Port 53 blocks on SRV records on Windows machines.
 */
async function resolveSrvToLegacy(uri: string) {
  if (!uri.startsWith('mongodb+srv://')) return uri;
  
  const match = uri.match(/^mongodb\+srv:\/\/(.*?)@([^/?]+)(\/.*)?$/);
  if (!match) return uri;
  
  const [, creds, host, restParam] = match;
  
  try {
    const srvRes = await fetch(`https://dns.google/resolve?name=_mongodb._tcp.${host}&type=SRV`).then(r => r.json());
    const txtRes = await fetch(`https://dns.google/resolve?name=${host}&type=TXT`).then(r => r.json());

    if (!srvRes?.Answer?.length) return uri;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const targets = srvRes.Answer.map((ans: any) => {
      const parts = ans.data.trim().split(' ');
      const port = parts[2];
      let targetHost = parts[3];
      if (targetHost.endsWith('.')) targetHost = targetHost.slice(0, -1);
      return `${targetHost}:${port}`;
    }).join(',');

    let txtParams = '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (txtRes?.Answer) txtParams = txtRes.Answer.map((ans: any) => ans.data.replace(/["']/g, '')).join('&');

    const rawStr = typeof restParam === 'string' ? restParam.replace(/^\/\?/, '') : '';
    const finalParams = [txtParams, rawStr, 'ssl=true'].filter(Boolean).join('&');

    return `mongodb://${creds}@${targets}/?${finalParams}`;
  } catch (e) {
    console.warn('HTTP SRV Resolver Failed:', e);
    return uri;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached = (global as any).mongoose;

if (!cached) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = resolveSrvToLegacy(MONGODB_URI).then(legacyUri => {
      return mongoose.connect(legacyUri, opts);
    }).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
