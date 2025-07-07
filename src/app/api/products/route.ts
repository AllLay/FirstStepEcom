import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://First-Step-E-com:Dqa4p1cMtxoHmRTR@clusterfse.fcam8xq.mongodb.net";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("BigAssData");
    const products = await db.collection("products").find({}).toArray();

    const cleanProducts = products.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
      type: p.type,
    }));

    return NextResponse.json(cleanProducts);
  } catch (error) {
    console.error("MongoDB fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}