import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`http://localhost:5000/api/items/${id}`, { next: { revalidate: 0 } });
  if (!res.ok) return null;
  return res.json();
}

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product)
    return <div className="p-10 text-center text-xl">Product not found.</div>;

  return (
    <div className="min-h-screen max-w-3xl mx-auto p-10">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="rounded-xl object-contain"
          />
          <h3 className="text-xl mt-4 font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
          <p className="mt-2 text-lg font-bold">{product.price} MMK</p>
        </div>

        <form className="w-full md:w-1/2 space-y-4 bg-white border rounded-xl p-6 shadow">
          <h3 className="text-xl font-semibold">Customer Info</h3>

          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <textarea
            placeholder="Shipping Address"
            required
            rows={4}
            className="w-full px-4 py-2 border rounded-md"
          />

          <button
            type="submit"
            className="bg-black hover:bg-black/80 text-white px-4 py-2 rounded-md"
          >
            Place Order (Coming Soon)
          </button>
        </form>
      </div>
    </div>
  );
}