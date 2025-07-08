import { MongoClient, Db } from 'mongodb';
import { config } from 'dotenv';

config({ path: 'workspace/.env' });

let uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI" in your workspace/.env file.');
}

// Robustness: Trim whitespace and remove quotes from the connection string
uri = uri.trim();
if ((uri.startsWith('"') && uri.endsWith('"')) || (uri.startsWith("'") && uri.endsWith("'"))) {
  uri = uri.substring(1, uri.length - 1);
}

if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    throw new Error(
      'Invalid MONGODB_URI scheme. The connection string must start with "mongodb://" or "mongodb+srv://". Please check your workspace/.env file.'
    );
}

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

let db: Db;

export async function getDb(): Promise<Db> {
    if (db) {
        return db;
    }
    const client = await clientPromise;
    const dbName = new URL(uri).pathname.substring(1) || 'archicontrol';
    db = client.db(dbName);
    return db;
}

export default clientPromise;
