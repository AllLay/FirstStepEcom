import { getDb } from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await getDb();
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