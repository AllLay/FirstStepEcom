"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface CartContextType {
  cartCount: number;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  refreshCart: () => {},
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = async () => {
    if (!token) return setCartCount(0);
    try {
      const res = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartCount(res.data.length);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [token]);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}