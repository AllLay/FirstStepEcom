import { MongoClient } from "mongodb";

const uri = "mongodb+srv://First-Step-E-com:Dqa4p1cMtxoHmRTR@clusterfse.fcam8xq.mongodb.net/BigAssData?retryWrites=true&w=majority";

let client: MongoClient | null = null;

export async function getDb() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db();
}