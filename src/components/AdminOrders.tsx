import React, { useState } from "react";
import { Order } from "../types";
import { Clock, ShoppingCart, MapPin, Coffee, TrendingUp, Phone, User, MessageSquare, CreditCard, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AdminOrdersProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: Order["status"]) => void;
  onDeleteOrder: (id: string) => void;
  onClearOrders: () => void;
}

export default function AdminOrders({ orders, onUpdateStatus, onDeleteOrder, onClearOrders }: AdminOrdersProps) {
  console.log("AdminOrders: onClearOrders is", typeof onClearOrders);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const sortedOrders = [...orders].sort((a, b) => b.createdAt - a.createdAt);

  const handleClear = async () => {
    console.log("AdminOrders: handleClear called");
    setIsClearing(true);
    try {
      await onClearOrders();
      console.log("AdminOrders: handleClear successful");
      setShowConfirm(false);
    } catch (error) {
      console.error("Failed to clear orders:", error);
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-red-100"
            >
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <X className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold text-center text-[#1A1A1A] mb-2">Clear All Orders?</h3>
              <p className="text-gray-500 text-center text-sm mb-8 leading-relaxed">
                This will permanently delete all recent orders and reset the order IDs back to 1. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleClear}
                  disabled={isClearing}
                  className={`flex-1 py-3 px-4 font-bold rounded-xl shadow-lg transition-all ${
                    isClearing 
                      ? "bg-red-400 cursor-not-allowed text-white/50" 
                      : "bg-red-600 hover:bg-red-700 text-white shadow-red-200"
                  }`}
                >
                  {isClearing ? "Clearing..." : "Yes, Clear"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OrderStatCard 
          icon={<TrendingUp size={24} />} 
          label="Total Orders" 
          value={orders.length.toString()} 
          color="text-blue-600" 
          bgColor="bg-blue-50" 
        />
        <OrderStatCard 
          icon={<MapPin size={24} />} 
          label="Delivery" 
          value={orders.filter(o => o.type === "Delivery").length.toString()} 
          color="text-orange-600" 
          bgColor="bg-orange-50" 
        />
        <OrderStatCard 
          icon={<Coffee size={24} />} 
          label="Order in Area" 
          value={orders.filter(o => o.type === "Order in Area").length.toString()} 
          color="text-purple-600" 
          bgColor="bg-purple-50" 
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">Recent Transactions</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowConfirm(true)}
              className="px-3 py-1.5 text-xs font-bold bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-100"
            >
              Clear Recent Orders
            </button>
            <button className="px-3 py-1.5 text-xs font-bold bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 transition-colors">Export CSV</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Product Details</th>
                <th className="px-6 py-4">Order Type</th>
                <th className="px-6 py-4">Total Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sortedOrders.map(order => (
                <motion.tr 
                  layout
                  key={order.id} 
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-mono text-xs font-bold text-[#B22222]">
                        {order.type === "Order in Area" ? `#${order.orderNumber}` : "DELIVERY"}
                      </span>
                      <span className="text-[10px] text-gray-400 truncate max-w-[80px]">{order.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#FDF5E6] rounded-full flex items-center justify-center text-[#B22222] text-xs font-bold">
                        {order.firstName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1A1A1A]">{order.firstName} {order.lastName}</p>
                        <div className="flex items-center gap-1 text-[10px] text-gray-400">
                          <Phone size={10} />
                          {order.phoneNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-bold text-[#1A1A1A]">{order.productName}</p>
                      <p className="text-[10px] text-gray-400">{order.cupSize} • {order.sugarLvl}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.type === "Delivery" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>
                      {order.type === "Delivery" ? <MapPin size={10} /> : <Coffee size={10} />}
                      {order.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-[#1A1A1A]">
                      {order.currency === 'PHP' ? '₱' : 
                       order.currency === 'USD' ? '$' : 
                       order.currency === 'EUR' ? '€' : '£'}
                      {order.totalPrice || "---"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === 'Complete' || order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status || (order.type === 'Delivery' ? 'Delivering' : 'On Que')}
                      </span>
                      
                      <div className="flex gap-1">
                        {order.type === "Order in Area" ? (
                          <>
                            <button 
                              onClick={() => onUpdateStatus(order.id, "On Que")}
                              className={`px-2 py-1 text-[8px] font-bold rounded border transition-all ${order.status === "On Que" ? "bg-yellow-500 border-yellow-500 text-white" : "border-gray-200 text-gray-400 hover:border-yellow-500 hover:text-yellow-500"}`}
                            >
                              QUE
                            </button>
                            <button 
                              onClick={() => onUpdateStatus(order.id, "Complete")}
                              className={`px-2 py-1 text-[8px] font-bold rounded border transition-all ${order.status === "Complete" ? "bg-green-500 border-green-500 text-white" : "border-gray-200 text-gray-400 hover:border-green-500 hover:text-green-500"}`}
                            >
                              DONE
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => onUpdateStatus(order.id, "Delivering")}
                              className={`px-2 py-1 text-[8px] font-bold rounded border transition-all ${order.status === "Delivering" ? "bg-orange-500 border-orange-500 text-white" : "border-gray-200 text-gray-400 hover:border-orange-500 hover:text-orange-500"}`}
                            >
                              DELIVERING
                            </button>
                            <button 
                              onClick={() => onUpdateStatus(order.id, "Delivered")}
                              className={`px-2 py-1 text-[8px] font-bold rounded border transition-all ${order.status === "Delivered" ? "bg-green-500 border-green-500 text-white" : "border-gray-200 text-gray-400 hover:border-green-500 hover:text-green-500"}`}
                            >
                              DELIVERED
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                      <Clock size={12} />
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => {
                        if (window.confirm("Delete this order?")) {
                          onDeleteOrder(order.id);
                        }
                      }}
                      className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {orders.length === 0 && (
          <div className="p-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart size={32} className="text-gray-200" />
            </div>
            <h4 className="text-lg font-serif font-bold text-gray-400">No orders recorded</h4>
            <p className="text-sm text-gray-300">Orders will appear here once customers start purchasing.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderStatCard({ icon, label, value, color, bgColor }: { icon: React.ReactNode, label: string, value: string, color: string, bgColor: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${bgColor} ${color} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-3xl font-serif font-bold text-[#1A1A1A]">{value}</p>
    </div>
  );
}
