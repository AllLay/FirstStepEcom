import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsData from "./products.json";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(() => {
    const product = productsData.find((item) => item.id.toString() === id);
    if (product) {
      return { ...product, selectedVariation: product.variations[0] };
    }
    return null;
  });  

  if (!selectedProduct) {
    return <div className="text-center text-red-500 mt-10 text-lg">Product not found!</div>;
  }

  const handleBuy = () => {
    navigate("/checkout", { state: { product: selectedProduct, selectedVariation: selectedProduct.selectedVariation } });
  };

  return (
    <div className="p-4 flex justify-center items-center min-h-screen bg-black text-white">
      <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg flex flex-col items-center gap-6 w-full max-w-xl border border-gray-700">
      <img
        src={`${process.env.PUBLIC_URL}${selectedProduct.selectedVariation.image}`}
        alt={selectedProduct.selectedVariation.name}
        className="w-48 h-48 rounded-md border-4 border-gray-600 object-cover"
      />
        
        <div className="text-center w-full">
          <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {selectedProduct.selectedVariation.name}
          </h2>
          <h3 className="text-sm mb-2" style={{ fontFamily: "Arimo, sans-serif" }}>
            By {selectedProduct.company}
          </h3>
          <p className="text-lg font-bold text-yellow-400">
            {new Intl.NumberFormat().format(selectedProduct.selectedVariation.price)} {selectedProduct.selectedVariation.currency}
          </p>
          <p className="mt-3 text-sm text-gray-300">{selectedProduct.description}</p>
          <br />
          <p className="mt-3 text-sm text-gray-300">Color: {selectedProduct.color}</p>
          <br />
          <p className="text-sm text-gray-400">Contact Us: {selectedProduct.contact}</p>
        </div>
        
        <div className="flex gap-4 justify-center">
          {selectedProduct.variations.map((variation) => (
            <button
              key={variation.id}
              className={`w-16 h-16 rounded-md border-2 transition transform duration-300 ease-in-out ${
                selectedProduct.selectedVariation.id === variation.id
                  ? "border-yellow-500 scale-110"
                  : "border-gray-600 hover:border-yellow-500 hover:scale-110"
              }`}
              onClick={() => setSelectedProduct({ ...selectedProduct, selectedVariation: variation })}
            >
              <img
                src={`${process.env.PUBLIC_URL}${variation.image}`}
                alt={variation.name}
                className="w-full h-full object-cover rounded-md"
              />
            </button>
          ))}
        </div>
        
        <button
          onClick={handleBuy}
          className="mt-4 bg-yellow-500 text-black p-3 rounded-md w-48 font-bold transition transform duration-300 ease-in-out hover:bg-yellow-600 hover:scale-105"
          style={{ fontFamily: "Fira Code, monospace" }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
