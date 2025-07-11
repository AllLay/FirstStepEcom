import { MongoClient, ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const uri = process.env.MONGODB_URI!;

async function getDb() {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db("BigAssData");
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const db = await getDb();

  let product;
  try {
    const objectId = new ObjectId(params.id);
    product = await db.collection("products").findOne({ _id: objectId });
  } catch (err) {
    return notFound();
  }

  if (!product) return notFound();

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-10">
      <div className="flex flex-col md:flex-row gap-10">
        <Image
          src={product.image}
          width={500}
          height={500}
          alt={product.name}
          className="rounded-xl object-contain"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-2">
            Price: {product.price} MMK
          </p>
          <p className="text-sm text-gray-500 mb-6">Type: {product.type}</p>

          <Link href={`/checkout/${product._id}`}>
            <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-black/80 transition">
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}