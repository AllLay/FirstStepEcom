// /app/my-shop/page.tsx (or wherever this component is)
'use client';

import {
  Plus,
  Package,
  DollarSign,
  TrendingUp,
  SquarePen,
  Trash2,
  X,
  Upload,
} from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { UploadButton } from '@uploadthing/react';
import type { OurFileRouter } from '@/lib/uploadthing';

interface Product {
  _id: string;
  name: string;
  price: number;
  type: string;
  stock: number;
  image: string;
  status: string;
  description: string;
}

// ...ProductCard code remains unchanged...

function MyShop() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    type: '',
    price: '',
    stock: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await axios.get(`${API_BASE}/api/items`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
    fetchProducts();
  }, [API_BASE]);

  const handleSubmitProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    const payload = {
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      status: 'active',
      type: newProduct.type || 'Not Defined',
      stock: parseInt(newProduct.stock),
      image: newProduct.image,
      description: newProduct.description,
    };

    try {
      let res;
      if (selectedProduct) {
        res = await axios.put(`${API_BASE}/api/items/${selectedProduct._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(prev => prev.map(p => (p._id === res.data._id ? res.data : p)));
      } else {
        res = await axios.post(`${API_BASE}/api/items`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(prev => [...prev, res.data]);
      }
      setNewProduct({ name: '', type: '', price: '', stock: '', image: '', description: '' });
      setOpenPopup(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await axios.delete(`${API_BASE}/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen m-10">
      {/* Top Section & Button */}
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl">My Shop</h2>
          <p className="my-2.5">Manage your products and inventory</p>
        </div>
        <div>
          <button
            onClick={() => {
              setSelectedProduct(null);
              setNewProduct({ name: '', type: '', price: '', stock: '', image: '', description: '' });
              setOpenPopup(true);
            }}
            className="flex bg-black cursor-pointer hover:bg-black/80 transition py-4 px-5 rounded-4xl text-white"
          >
            <Plus /> Add Product
          </button>
        </div>

        {/* Popup */}
        {openPopup && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  {selectedProduct ? 'Edit Product' : 'Add Product'}
                </h2>
                <button
                  onClick={() => setOpenPopup(false)}
                  className="text-gray-600 hover:text-black text-xl"
                >
                  <X />
                </button>
              </div>
              <form className="p-5" onSubmit={handleSubmitProduct}>
                {/* Form Inputs */}
                <input type="text" placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} required className="input" />
                <select value={newProduct.type} onChange={e => setNewProduct({ ...newProduct, type: e.target.value })} required className="input">
                  <option value="">Select a type</option>
                  <option value="T-Shirt">T-Shirt</option>
                  <option value="Shirt">Shirt</option>
                  <option value="Blouse">Blouse</option>
                </select>
                <input type="number" min="1" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required className="input" />
                <input type="number" min="1" placeholder="Amount" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} required className="input" />

                <div className="my-4">
                  <UploadButton<OurFileRouter>
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      const url = res?.[0]?.url;
                      if (url) setNewProduct(prev => ({ ...prev, image: url }));
                    }}
                    onUploadError={(err) => console.error('UploadThing Error:', err)}
                  />
                </div>

                <textarea placeholder="Write something about your product..." value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="textarea" />

                {newProduct.image && (
                  <div className="mt-4 flex justify-center">
                    <Image src={newProduct.image} alt="Preview" width={200} height={200} className="object-contain rounded-md border" onError={e => (e.currentTarget.src = '/img/placeholder.png')} />
                  </div>
                )}

                <div className="flex justify-center mt-4">
                  <button type="submit" className="bg-black hover:bg-black/80 text-white px-4 py-2 rounded-4xl">
                    {selectedProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Stats + Product List */}
      <div className="my-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<Package className="h-8 w-8 text-blue-600" />} title="Total Products" value={products.length} bg="bg-blue-100" />
          <StatCard icon={<DollarSign className="h-8 w-8 text-green-600" />} title="Total Value" value={`${Intl.NumberFormat('en-US').format(products.reduce((sum, p) => sum + p.price * p.stock, 0))} MMK`} bg="bg-green-100" />
          <StatCard icon={<TrendingUp className="h-8 w-8 text-purple-600" />} title="Active Products" value={products.filter(p => p.status === 'active').length} bg="bg-purple-100" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={deleteProduct}
              onEdit={p => {
                setSelectedProduct(p);
                setNewProduct({
                  name: p.name,
                  type: p.type,
                  price: String(p.price),
                  stock: String(p.stock),
                  image: p.image,
                  description: p.description,
                });
                setOpenPopup(true);
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

// Small Tailwind helper
const StatCard = ({ icon, title, value, bg }: { icon: React.ReactNode; title: string; value: string | number; bg: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:scale-105 transition-all duration-300">
    <div className="flex items-center">
      <div className={`p-3 ${bg} rounded-lg`}>{icon}</div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

export default MyShop;
