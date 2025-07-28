"use client";

import { useState } from "react";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "k-pay") {
      alert("Redirecting to KBZ Pay gateway...");
      // TODO: fr payment
      return;
    }

    alert(`Selected payment method: ${paymentMethod}`);
  };

  const methods = [
    { id: "a-pay", label: "Aya Pay", icon: "A" },
    { id: "k-pay", label: "KBZ Pay", icon: "K" },
    { id: "cash-on-delivery", label: "Cash on Delivery", icon: "💵" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-10 text-gray-900">Select Payment Method</h1>

      <form
        onSubmit={handlePaymentSubmit}
        className="w-full max-w-lg bg-white rounded-xl shadow-md p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {methods.map(({ id, label, icon }) => (
            <label
              key={id}
              htmlFor={id}
              className={`
                cursor-pointer select-none rounded-lg border-2 p-6 flex flex-col items-center justify-center
                transition-colors duration-300
                ${
                  paymentMethod === id
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-300 hover:border-blue-400 hover:bg-blue-10"
                }
              `}
            >
              <input
                type="radio"
                id={id}
                name="payment"
                value={id}
                checked={paymentMethod === id}
                onChange={() => setPaymentMethod(id)}
                className="hidden"
              />
              <div className="text-5xl mb-4">{icon}</div>
              <span className="text-lg font-semibold text-gray-700">{label}</span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={!paymentMethod}
          className="mt-10 w-full rounded-lg bg-blue-600 py-3 text-white text-lg font-semibold 
          disabled:opacity-50 hover:bg-blue-700 transition-colors duration-300"
        >
          Proceed to Pay
        </button>
      </form>
    </div>
  );
}