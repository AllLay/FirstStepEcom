'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const types = ["All", "T-Shirt", "Shirt", "Blouse"];

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  type: string;
};

const Shop = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedType === "All"
      ? products
      : products.filter((p) => p.type === selectedType);

  return (
    <main className="flex">
      {/* Sidebar */}
      <section className="w-1/5 p-4 border-r min-h-screen">
        <h2 className="text-xl font-semibold mb-4">Choose Type</h2>
        <ul className="space-y-2">
          {types.map((type) => (
            <li
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg cursor-pointer transition duration-300 
                ${selectedType === type
                  ? "bg-black/80 text-white shadow-md scale-105"
                  : "hover:bg-black/60 hover:text-white/60"}   
              `}
            >
              {type}
            </li>
          ))}
        </ul>
      </section>

      {/* Products */}
      <section className="flex-grow">
        {loading && <p className="p-10">Loading products...</p>}
        {!loading && filteredProducts.length === 0 && (
          <p className="p-10">No products found in this type.</p>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
          {filteredProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className="shadow-lg rounded-2xl p-4 w-fit m-10 transform transition duration-300 hover:scale-105 cursor-pointer">
                <Image
                  className="rounded-2xl"
                  src={product.image}
                  width={400}
                  height={400}
                  alt={product.name}
                />
                <p className="text-center my-2">{product.name}</p>
                <p className="text-center mb-2">{product.description}</p>
                <p className="text-center">{product.price.toFixed(2)} MMK</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Shop;