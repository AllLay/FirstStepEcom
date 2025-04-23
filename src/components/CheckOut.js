import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckOut = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [contactMethod, setContactMethod] = useState("email");
  
  const product = location.state?.product;
  const selectedVariation = location.state?.selectedVariation;

  if (!product || !selectedVariation) {
    return <div className="text-center text-red-500">Product or variation not found!</div>;
  }

  const handlePurchase = async () => {
    try {
      const response = await fetch(
        "https://aunggroupofbusiness-production.up.railway.app/checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: product.id,
            variationId: selectedVariation.id,
            clientName,
            clientEmail: contactMethod !== "phone" ? clientEmail : "",
            clientPhone: contactMethod !== "email" ? clientPhone : "",
          }),
        }
      );
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/");
      } else {
        alert("Error: " + (data.message || "Purchase failed"));
      }
    } catch (error) {
      alert("Failed to connect to the server.");
    }
  };  

  return (
    <div className="p-6 flex justify-center items-center min-h-screen bg-black">
      <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg flex flex-col items-center gap-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>Checkout</h2>
        <h3 className="text-lg mb-4 text-white" style={{ fontFamily: "Arimo, sans-serif" }}>Product: {product.name}</h3>
        <img
          src={product.image}
          alt={product.name}
          className="w-48 h-48 rounded-md mb-4 border-4 border-gray-600 object-cover"
        />
        <p className="text-lg font-bold text-yellow-400">
          {new Intl.NumberFormat().format(selectedVariation.price)} MMK
        </p>
        <p className="text-sm text-gray-300 mb-4">{product.description}</p>
        
        <div className="w-full mb-4">
          <p className="text-white text-sm">Selected: {selectedVariation.name}</p>
        </div>
        
        <div className="w-full mt-4">
          <label className="text-white text-sm">Your Name:</label>
          <input
            type="text"
            className="p-3 rounded-md w-full text-black mt-2"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="w-full mt-4">
          <label className="text-white text-sm">Preferred Contact Method:</label>
          <select
            className="p-3 rounded-md w-full text-black mt-2"
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="both">Both Email & Phone</option>
          </select>
        </div>

        {contactMethod !== "phone" && (
          <div className="w-full mt-4">
            <label className="text-white text-sm">Your Email:</label>
            <input
              type="email"
              className="p-3 rounded-md w-full text-black mt-2"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
        )}

        {contactMethod !== "email" && (
          <div className="w-full mt-4">
            <label className="text-white text-sm">Your Phone Number:</label>
            <input
              type="tel"
              className="p-3 rounded-md w-full text-black mt-2"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
        )}

        <button
          className="mt-6 bg-yellow-500 text-black p-3 rounded-md w-full sm:w-auto hover:bg-yellow-600 transition duration-300"
          onClick={handlePurchase}
          disabled={
            !clientName ||
            (contactMethod !== "phone" && !clientEmail) ||
            (contactMethod !== "email" && !clientPhone)
          }
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
