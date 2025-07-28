"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "./CartContext";
import api from "@/lib/api";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  type: string;
}

interface Props {
  product: Product;
  className?: string;
}

export default function AddToCartButton({ product, className }: Props) {
  const { token } = useAuth();
  const { refreshCart } = useCart();
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    if (!token) return alert("Please log in to use the cart");

    try {
      setLoading(true);
      await api.post(
        "/cart",
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      refreshCart();
      alert(`${product.name} added to cart!`);
    } catch {
      alert("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={addToCart}
      className={className ?? "bg-black text-white px-6 py-3 rounded-xl hover:bg-black/80 transition"}
      disabled={loading}
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}