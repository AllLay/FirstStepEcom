"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface CartItemType {
  productId: {
    _id: string;
    name: string;
    price: number;
    image: string;
  } | null;
  quantity: number;
}

function CartItem({ item, onRemove }: { item: CartItemType; onRemove: () => void }) {
  const { productId, quantity } = item;

  if (!productId) {
    return (
      <div className="flex items-center gap-4 border-b py-4">
        <p className="text-red-500 flex-1">Product no longer available</p>
        <button onClick={onRemove}>
          <X className="w-5 h-5 text-red-500 hover:text-red-700" />
        </button>
      </div>
    );
  }

  const total = productId.price * quantity;

  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="relative w-20 h-20">
        <Image
          src={productId.image || "/placeholder.jpg"}
          alt={productId.name}
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
      </div>
      <div className="flex-1">
        <p className="font-medium">{productId.name}</p>
        <p className="text-sm text-gray-500">Price: ${productId.price}</p>
        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
        <p className="font-semibold">Total: ${total}</p>
      </div>
      <button onClick={onRemove}>
        <X className="w-5 h-5 text-red-500 hover:text-red-700" />
      </button>
    </div>
  );
}

export default function CheckOut() {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const validItems = res.data.filter((item: CartItemType) => item.productId !== null);
      setCartItems(validItems);
    } catch (err) {
      console.error("Failed to load cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      await api.delete(`/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((prev) => prev.filter((item) => item.productId?._id !== productId));
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete(`/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems([]);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  const totalCost = cartItems.reduce(
    (acc, item) => acc + ((item.productId?.price ?? 0) * item.quantity),
    0
  );

  useEffect(() => {
    fetchCart();
  }, [token]);

  return (
    <div className="min-h-screen max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item.productId?._id ?? Math.random()}
            item={item}
            onRemove={() => item.productId && removeItem(item.productId._id)}
          />
        ))
      )}

      <div className="flex justify-between items-center mt-8">
        <p className="text-xl font-semibold">Total: ${totalCost.toFixed(2)}</p>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear All
          </button>
          <Link
            href="/Payment"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Buy
          </Link>
        </div>
      </div>
    </div>
  );
}