'use client';

import { Plus, Package, DollarSign, TrendingUp, SquarePen, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { UploadButton } from '@uploadthing/react';

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

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onEdit }) => {
  const [imgError, setImgError] = useState(false);
  const productActivity = product.stock === 0 ? 'gone' : 'active';

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md hover:scale-105 transition-all duration-300">
      <div className="w-full h-[250px] flex justify-center items-center overflow-hidden rounded-xl mx-auto">
        <Image
          src={
            !imgError && product.image && product.image.trim() !== ''
              ? product.image
              : '/img/placeholder.png'
          }
          alt={product.name}
          width={250}
          height={250}
          onError={() => setImgError(true)}
          className="object-contain"
        />
      </div>

      <div className="flex justify-between items-center mt-2">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p
          className="text-sm"
          style={{
            color: productActivity === 'gone' ? 'red' : 'green',
          }}
        >
          {productActivity}
        </p>
      </div>

      <p className="text-gray-500">{product.type}</p>

      <div className="flex justify-between mt-1">
        <p className="font-medium">{product.price} MMK</p>
        <p className="font-medium">{product.stock}</p>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(product)}
          className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-400 px-5 py-2 rounded-4xl cursor-pointer"
        >
          <SquarePen size={16} /> Edit
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-400 px-5 py-2 rounded-4xl cursor-pointer"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
};

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
      if (selectedProduct) {
        const res = await axios.put(
          `${API_BASE}/api/items/${selectedProduct._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const updated = res.data;
        setProducts(prev => prev.map(p => (p._id === updated._id ? updated : p)));
      } else {
        const res = await axios.post(`${API_BASE}/api/items`, payload, {
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
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      await axios.delete(`${API_BASE}/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const activeProducts = products.filter(p => p.status === 'active').length;

  return (
    <main className="min-h-screen m-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl">My Shop</h2>
          <p className="my-2.5">Manage your products and inventory</p>
        </div>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setNewProduct({ name: '', type: '', price: '', stock: '', image: '', description: '' });
            setOpenPopup(true);
          }}
          className="flex bg-black hover:bg-black/80 transition py-4 px-5 rounded-4xl text-white"
        >
          <Plus /> Add Product
        </button>
      </div>

      {openPopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {selectedProduct ? 'Edit Product' : 'Add Product'}
              </h2>
              <button onClick={() => setOpenPopup(false)} className="text-gray-600 hover:text-black text-xl">
                <X />
              </button>
            </div>
            <form onSubmit={handleSubmitProduct} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={newProduct.name}
                onChange={e => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                required
                className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black placeholder:text-center"
              />
              <select
                value={newProduct.type}
                onChange={e => setNewProduct(prev => ({ ...prev, type: e.target.value }))}
                required
                className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black text-center"
              >
                <option value="">Select a type</option>
                <option value="T-Shirt">T-Shirt</option>
                <option value="Shirt">Shirt</option>
                <option value="Blouse">Blouse</option>
              </select>
              <input
                type="number"
                min="1"
                placeholder="Price"
                value={newProduct.price}
                onChange={e => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                required
                className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black placeholder:text-center"
              />
              <input
                type="number"
                min="1"
                placeholder="Amount"
                value={newProduct.stock}
                onChange={e => setNewProduct(prev => ({ ...prev, stock: e.target.value }))}
                required
                className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black placeholder:text-center"
              />

              <div className="w-full p-6 border-2 border-dashed rounded-lg text-center">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={res => {
                    if (res?.[0]?.fileUrl) {
                      setNewProduct(prev => ({ ...prev, image: res[0].fileUrl }));
                    }
                  }}
                  onUploadError={err => console.error('UploadThing error:', err)}
                >
                  <span className="inline-block py-3 px-6 bg-black text-white rounded-4xl cursor-pointer hover:bg-black/80">
                    Choose Image
                  </span>
                </UploadButton>
              </div>

              <textarea
                placeholder="Write something about your product..."
                value={newProduct.description}
                onChange={e => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                className="block w-full p-4 border rounded-md focus:ring-2 focus:ring-black placeholder:text-center"
              />

              {newProduct.image && (
                <div className="flex justify-center">
                  <Image
                    src={newProduct.image}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="object-contain rounded-md border"
                  />
                </div>
              )}

              <button
                type="submit"
                className="block w-full py-2 rounded-4xl bg-black text-white hover:bg-black/80 transition"
              >
                {selectedProduct ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard icon={<Package className="h-8 w-8 text-blue-600" />} title="Total Products" value={totalProducts} bg="bg-blue-100" />
        <StatCard icon={<DollarSign className="h-8 w-8 text-green-600" />} title="Total Value" value={`${Intl.NumberFormat('en-US').format(totalValue)} MMK`} bg="bg-green-100" />
        <StatCard icon={<TrendingUp className="h-8 w-8 text-purple-600" />} title="Active Products" value={activeProducts} bg="bg-purple-100" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(prod => (
          <ProductCard key={prod._id} product={prod} onDelete={deleteProduct} onEdit={p => {
            setSelectedProduct(p);
            setNewProduct({ name: p.name, type: p.type, price: String(p.price), stock: String(p.stock), image: p.image, description: p.description });
            setOpenPopup(true);
          }} />
        ))}
      </div>
    </main>
  );
}

const StatCard = ({ icon, title, value, bg }: { icon: React.ReactNode; title: string; value: string | number; bg: string; }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border hover:scale-105 transition-all duration-300">
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
