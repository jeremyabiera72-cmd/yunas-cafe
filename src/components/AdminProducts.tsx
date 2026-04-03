import React, { useState, useRef } from "react";
import { Product, Category } from "../types";
import { Plus, Trash2, Image as ImageIcon, Loader2, X, Search, Filter, Package } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AdminProductsProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, "id" | "createdAt">) => void;
  onDeleteProduct: (id: string) => void;
}

export default function AdminProducts({ products, onAddProduct, onDeleteProduct }: AdminProductsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<Category | "All">("All");
  
  const [newProduct, setNewProduct] = useState<Omit<Product, "id" | "createdAt">>({
    name: "",
    price: 0,
    currency: "PHP",
    temperature: "Hot",
    cupSizes: ["12oz", "16oz", "20oz"],
    sugarLevel: "Medium",
    otherDetails: "",
    category: "Best Coffee Menu's",
    imageUrl: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.imageUrl) {
      alert("Please provide an image URL for the product.");
      return;
    }
    onAddProduct(newProduct);
    setShowAddForm(false);
    setNewProduct({
      name: "",
      price: 0,
      currency: "PHP",
      temperature: "Hot",
      cupSizes: ["12oz", "16oz", "20oz"],
      sugarLevel: "Medium",
      otherDetails: "",
      category: "Best Coffee Menu's",
      imageUrl: ""
    });
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "All" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B22222]/20 focus:border-[#B22222] outline-none transition-all"
            />
          </div>
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as any)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B22222]/20 focus:border-[#B22222] outline-none transition-all"
          >
            <option value="All">All Categories</option>
            <option value="Best Coffee Menu's">Best Coffee</option>
            <option value="Newest Coffee Menu's">Newest</option>
            <option value="Other Menu's">Others</option>
          </select>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-[#B22222] text-white px-6 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#8B1A1A] transition-all shadow-md active:scale-95"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">Add New Product</h3>
                <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Product Name</label>
                      <input required type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B22222]/20 focus:border-[#B22222] outline-none transition-all" placeholder="e.g. Caramel Macchiato" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Price</label>
                        <input required type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B22222]/20 focus:border-[#B22222] outline-none transition-all" placeholder="0.00" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Currency</label>
                        <select value={newProduct.currency} onChange={e => setNewProduct({...newProduct, currency: e.target.value as any})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B22222]/20 focus:border-[#B22222] outline-none transition-all">
                          <option value="PHP">PHP (₱)</option>
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Category</label>
                      <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value as Category})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B22222]/20 focus:border-[#B22222] outline-none transition-all">
                        <option value="Best Coffee Menu's">Best Coffee Menu's</option>
                        <option value="Newest Coffee Menu's">Newest Coffee Menu's</option>
                        <option value="Other Menu's">Other Menu's</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Product Image URL</label>
                      <input 
                        required 
                        type="url" 
                        value={newProduct.imageUrl} 
                        onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B22222]/20 focus:border-[#B22222] outline-none transition-all" 
                        placeholder="https://example.com/image.jpg" 
                      />
                      {newProduct.imageUrl && (
                        <div className="mt-2 aspect-video rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
                          <img 
                            src={newProduct.imageUrl} 
                            alt="Preview" 
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Temperature</label>
                      <div className="flex gap-2">
                        {["Hot", "Cold"].map(temp => (
                          <button 
                            key={temp} 
                            type="button" 
                            onClick={() => setNewProduct({...newProduct, temperature: temp as any})} 
                            className={`flex-1 py-2 rounded-lg border-2 font-medium transition-all ${newProduct.temperature === temp ? "bg-[#B22222] border-[#B22222] text-white shadow-md" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                          >
                            {temp}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Description / Other Details</label>
                  <textarea rows={3} value={newProduct.otherDetails} onChange={e => setNewProduct({...newProduct, otherDetails: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B22222]/20 focus:border-[#B22222] outline-none transition-all resize-none" placeholder="Add any additional details about the product..." />
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-[#1A1A1A] text-white py-3.5 rounded-xl font-bold hover:bg-[#B22222] transition-all shadow-lg">
                    Create Product
                  </button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-8 py-3.5 border-2 border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <motion.div 
            layout
            key={product.id} 
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <img 
                src={product.imageUrl || `https://picsum.photos/seed/${product.id}/400/300`} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${product.temperature === 'Hot' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'}`}>
                  {product.temperature}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-serif text-lg font-bold text-[#1A1A1A] line-clamp-1">{product.name}</h4>
                <span className="font-bold text-[#B22222]">
                  {product.currency === 'PHP' ? '₱' : 
                   product.currency === 'USD' ? '$' : 
                   product.currency === 'EUR' ? '€' : '£'}
                  {product.price}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-4 font-medium uppercase tracking-wide">{product.category}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <button className="text-xs font-bold text-gray-400 hover:text-[#B22222] transition-colors">Edit Details</button>
                <button 
                  onClick={() => onDeleteProduct(product.id)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-red-500 rounded-lg transition-all"
                  title="Delete Product"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-gray-500">No products found</h3>
          <p className="text-gray-400 text-sm">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  );
}
