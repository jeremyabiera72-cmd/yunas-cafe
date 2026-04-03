import React, { useState } from "react";
import { Product, Order, ContactMessage } from "../types";
import { Package, ShoppingCart, LayoutDashboard, LogOut, Coffee, TrendingUp, Users, DollarSign, MessageSquare, Menu, X } from "lucide-react";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminMessages from "./AdminMessages";
import { motion } from "motion/react";

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  messages: ContactMessage[];
  onAddProduct: (product: Omit<Product, "id" | "createdAt">) => void;
  onDeleteProduct: (id: string) => void;
  onDeleteMessage: (id: string) => void;
  onUpdateStatus: (orderId: string, status: Order["status"]) => void;
  onDeleteOrder: (id: string) => void;
  onClearOrders: () => void;
  onLogout: () => void;
  onHomeClick: () => void;
}

export default function AdminDashboard({ 
  products, 
  orders, 
  messages,
  onAddProduct, 
  onDeleteProduct, 
  onDeleteMessage,
  onUpdateStatus,
  onDeleteOrder,
  onClearOrders,
  onLogout,
  onHomeClick
}: AdminDashboardProps) {
  console.log("AdminDashboard: onClearOrders is", typeof onClearOrders);
  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "orders" | "messages">("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const revenuesByCurrency = orders.reduce((acc, order) => {
    const currency = order.currency || 'PHP';
    acc[currency] = (acc[currency] || 0) + (order.totalPrice || 0);
    return acc;
  }, {} as Record<string, number>);

  const totalOrders = orders.length;
  const totalProducts = products.length;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-6 left-6 z-50 p-3 bg-[#B22222] text-white rounded-xl shadow-lg hover:bg-[#8B1A1A] transition-all active:scale-95"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-[#1A1A1A] text-white flex flex-col fixed h-full z-40 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-8 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#B22222] rounded-lg flex items-center justify-center">
            <Coffee size={24} />
          </div>
          <span className="font-serif text-xl font-bold">Admin Panel</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <SidebarLink 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={activeTab === "dashboard"} 
            onClick={() => { setActiveTab("dashboard"); setIsSidebarOpen(false); }} 
          />
          <SidebarLink 
            icon={<Package size={20} />} 
            label="Products" 
            active={activeTab === "products"} 
            onClick={() => { setActiveTab("products"); setIsSidebarOpen(false); }} 
          />
          <SidebarLink 
            icon={<ShoppingCart size={20} />} 
            label="Orders" 
            active={activeTab === "orders"} 
            onClick={() => { setActiveTab("orders"); setIsSidebarOpen(false); }} 
          />
          <SidebarLink 
            icon={<MessageSquare size={20} />} 
            label="Messages" 
            active={activeTab === "messages"} 
            onClick={() => { setActiveTab("messages"); setIsSidebarOpen(false); }} 
          />
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button 
            onClick={onHomeClick}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
          >
            <TrendingUp size={20} className="rotate-[-45deg]" />
            <span>Back to Site</span>
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 pt-24">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] capitalize">{activeTab}</h1>
              <p className="text-gray-500 mt-1">Welcome back, manager. Here's what's happening today.</p>
            </div>
            <div className="text-sm text-gray-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </header>

          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
                      <DollarSign className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
                      <div className="space-y-1">
                        {Object.entries(revenuesByCurrency).map(([curr, amount]) => (
                          <p key={curr} className="text-xl font-bold text-[#1A1A1A]">
                            {curr === 'PHP' ? '₱' : curr === 'USD' ? '$' : curr === 'EUR' ? '€' : '£'}
                            {amount.toLocaleString()}
                          </p>
                        ))}
                        {Object.keys(revenuesByCurrency).length === 0 && (
                          <p className="text-xl font-bold text-[#1A1A1A]">₱0</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <StatCard icon={<ShoppingCart className="text-blue-600" />} label="Total Orders" value={totalOrders.toString()} color="bg-blue-50" />
                <StatCard icon={<Package className="text-purple-600" />} label="Total Products" value={totalProducts.toString()} color="bg-purple-50" />
              </div>

              {/* Recent Activity or Chart Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-serif text-xl font-bold mb-6 flex items-center gap-2">
                    <TrendingUp size={20} className="text-[#B22222]" />
                    Recent Orders
                  </h3>
                  <div className="space-y-4">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#B22222] font-bold">
                            {order.firstName[0]}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{order.firstName} {order.lastName}</p>
                            <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleTimeString()}</p>
                          </div>
                        </div>
                        <span className="font-bold text-sm">
                          {order.currency === 'PHP' ? '₱' : 
                           order.currency === 'USD' ? '$' : 
                           order.currency === 'EUR' ? '€' : '£'}
                          {order.totalPrice}
                        </span>
                      </div>
                    ))}
                    {orders.length === 0 && <p className="text-gray-400 text-sm text-center py-4">No orders yet.</p>}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-serif text-xl font-bold mb-6 flex items-center gap-2">
                    <Users size={20} className="text-[#B22222]" />
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setActiveTab("products")} className="p-4 bg-[#FDF5E6] hover:bg-[#F5E6D3] rounded-xl text-center transition-colors">
                      <Package className="mx-auto mb-2 text-[#B22222]" />
                      <span className="text-sm font-medium">Add Product</span>
                    </button>
                    <button onClick={() => setActiveTab("orders")} className="p-4 bg-[#FDF5E6] hover:bg-[#F5E6D3] rounded-xl text-center transition-colors">
                      <ShoppingCart className="mx-auto mb-2 text-[#B22222]" />
                      <span className="text-sm font-medium">View Orders</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <AdminProducts 
              products={products} 
              onAddProduct={onAddProduct} 
              onDeleteProduct={onDeleteProduct} 
            />
          )}

          {activeTab === "orders" && (
            <AdminOrders 
              orders={orders} 
              onUpdateStatus={onUpdateStatus} 
              onDeleteOrder={onDeleteOrder}
              onClearOrders={onClearOrders}
            />
          )}

          {activeTab === "messages" && (
            <AdminMessages 
              messages={messages} 
              onDeleteMessage={onDeleteMessage} 
            />
          )}
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active ? "bg-[#B22222] text-white shadow-lg" : "text-white/60 hover:text-white hover:bg-white/5"}`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold text-[#1A1A1A]">{value}</p>
      </div>
    </div>
  );
}

