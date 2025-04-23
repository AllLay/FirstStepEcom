import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import CheckOut from "./components/CheckOut";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
    </Router>
  );
};

export default App;