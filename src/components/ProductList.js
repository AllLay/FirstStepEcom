import React, { useState } from "react";
import { Link } from "react-router-dom";
import productsData from "./products.json";

const ProductList = () => {
  const [products] = useState(productsData);

  return (
    <div className="bg-[#101211] text-white px-6 py-10 flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 w-full max-w-screen-xl">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="bg-[#2A2A2A] p-4 rounded-xl shadow-lg hover:scale-[1.03] transition-transform duration-200 flex flex-col items-center text-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-base md:text-lg font-semibold mb-1">
              {product.name}
            </h3>
            <h4 className="text-sm text-gray-400">By {product.company}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;