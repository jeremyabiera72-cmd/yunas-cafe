import React, { useState } from "react";
import { motion } from "motion/react";
import { Product, Order } from "../types";
import { X, Coffee, ShoppingBag, Truck } from "lucide-react";

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onOrder: (order: Partial<Order>) => void;
}

export default function ProductDetail({ product, onClose, onOrder }: ProductDetailProps) {
  const [orderType, setOrderType] = useState<"Delivery" | "Order in Area">("Delivery");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    cupSize: product.cupSizes[0],
    sugarLvl: "Medium",
    additionalMessage: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOrder({
      ...formData,
      productId: product.id,
      productName: product.name,
      type: orderType,
      createdAt: Date.now()
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-[#FDF5E6] overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-4 py-12 relative">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 bg-[#B22222] text-white rounded-full hover:scale-110 transition-transform shadow-xl"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Product Info & Image */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => setOrderType("Delivery")}
                className={`flex-1 py-4 px-6 rounded-full font-serif text-xl flex items-center justify-center gap-3 transition-all ${orderType === "Delivery" ? "bg-black text-white shadow-2xl scale-105" : "bg-[#B22222]/10 text-[#B22222] hover:bg-[#B22222]/20"}`}
              >
                <Truck size={24} /> Delivery
              </button>
              <button 
                onClick={() => setOrderType("Order in Area")}
                className={`flex-1 py-4 px-6 rounded-full font-serif text-xl flex items-center justify-center gap-3 transition-all ${orderType === "Order in Area" ? "bg-black text-white shadow-2xl scale-105" : "bg-[#B22222]/10 text-[#B22222] hover:bg-[#B22222]/20"}`}
              >
                <Coffee size={24} /> Order in Area
              </button>
            </div>

            <div className="aspect-square bg-black rounded-sm overflow-hidden shadow-2xl border-4 border-[#B22222]/10">
              <img 
                src={product.imageUrl || `https://picsum.photos/seed/${product.id}/800/800`}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-6">
              <h2 className="font-serif text-5xl font-bold text-[#4B0000]">Details:</h2>
              <div className="space-y-4 text-2xl text-[#4B0000]/80 font-serif">
                <p><span className="text-[#B22222] font-bold">Product:</span> {product.name}</p>
                <p><span className="text-[#B22222] font-bold">Price:</span> ₱{product.price}</p>
                <p><span className="text-[#B22222] font-bold">Temperature:</span> {product.temperature}</p>
                <p><span className="text-[#B22222] font-bold">Cup Size Available:</span> {product.cupSizes.join(" ")}</p>
                <p><span className="text-[#B22222] font-bold">Sugar Level:</span> {product.sugarLevel}</p>
                <p><span className="text-[#B22222] font-bold">Other Details:</span> {product.otherDetails}</p>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="flex-1 w-full bg-white/50 p-8 md:p-12 rounded-sm border-2 border-[#B22222]/10 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#B22222] font-bold">First Name:</label>
                  <input 
                    required
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-[#B22222]/30 focus:border-[#B22222] outline-none py-3 text-xl transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#B22222] font-bold">Last Name:</label>
                  <input 
                    required
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-[#B22222]/30 focus:border-[#B22222] outline-none py-3 text-xl transition-colors" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#B22222] font-bold">Cup Size:</label>
                  <select 
                    value={formData.cupSize}
                    onChange={(e) => setFormData({...formData, cupSize: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-[#B22222]/30 focus:border-[#B22222] outline-none py-3 text-xl transition-colors"
                  >
                    {product.cupSizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#B22222] font-bold">Sugar Lvl:</label>
                  <select 
                    value={formData.sugarLvl}
                    onChange={(e) => setFormData({...formData, sugarLvl: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-[#B22222]/30 focus:border-[#B22222] outline-none py-3 text-xl transition-colors"
                  >
                    <option value="None">None</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#B22222] font-bold">Email:</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-[#B22222]/30 focus:border-[#B22222] outline-none py-3 text-xl transition-colors" 
                />
              </div>

              {orderType === "Delivery" ? (
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#B22222] font-bold">Address:</label>
                  <input 
                    required
                    type="text" 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-[#B22222]/30 focus:border-[#B22222] outline-none py-3 text-xl transition-colors" 
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#B22222] font-bold">Generated Number:</label>
                  <div className="p-4 bg-[#B22222]/5 border-2 border-dashed border-[#B22222]/30 text-[#B22222] font-serif text-lg text-center">
                    Automatically Generate costumer number/id that will call when the coffee is ready to serve.
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#B22222] font-bold">Phone Number:</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-[#B22222]/30 focus:border-[#B22222] outline-none py-3 text-xl transition-colors" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#B22222] font-bold">Additional message/Request:</label>
                <textarea 
                  rows={4} 
                  value={formData.additionalMessage}
                  onChange={(e) => setFormData({...formData, additionalMessage: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-[#B22222]/30 focus:border-[#B22222] outline-none py-3 text-xl transition-colors resize-none" 
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-6 bg-black text-white font-serif text-2xl hover:bg-[#B22222] transition-colors rounded-sm shadow-2xl flex items-center justify-center gap-4"
              >
                <ShoppingBag size={28} /> Order Now!
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
