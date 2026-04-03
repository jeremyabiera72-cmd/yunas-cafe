/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import AboutUs from "./components/AboutUs";
import AboutDetail from "./components/AboutDetail";
import ContactUs from "./components/ContactUs";
import ProductDetail from "./components/ProductDetail";
import AdminDashboard from "./components/AdminDashboard";
import Loading from "./components/Loading";
import OrderConfirmation from "./components/OrderConfirmation";
import Footer from "./components/Footer";
import { Product, Order, Category } from "./types";
import { useFirebase } from "./hooks/useFirebase";

export default function App() {
  const { 
    user, 
    isAdmin, 
    products, 
    orders, 
    loading, 
    addProduct, 
    deleteProduct, 
    placeOrder,
    uploadImage,
    messages,
    deleteMessage,
    logout,
    sendContactMessage,
    updateOrderStatus,
    clearOrders,
    deleteOrder
  } = useFirebase();

  const [view, setView] = useState<"home" | "admin" | "about-detail">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastOrder, setLastOrder] = useState<{ orderId: string; orderNumber: number } | null>(null);

  const handleOrder = async (orderData: Partial<Order>) => {
    try {
      const result = await placeOrder(orderData);
      if (result) {
        setLastOrder(result);
        setSelectedProduct(null);
      }
    } catch (error) {
      console.error("Order error:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#FDF5E6] font-sans text-[#4B0000]">
      {view === "home" && (
        <Navbar 
          onAdminClick={() => setView("admin")} 
          onHomeClick={() => setView("home")} 
        />
      )}

      <AnimatePresence mode="wait">
        {view === "home" ? (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero />
            
            <section id="menu" className="py-24 max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="w-20 h-20 bg-[#B22222] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <Coffee size={40} />
                </div>
                <h2 className="font-serif text-4xl font-bold text-[#4B0000]">Our Coffee Products/Menu</h2>
              </div>

              {(["Best Coffee Menu's", "Newest Coffee Menu's", "Other Menu's"] as Category[]).map(category => (
                <MenuSection 
                  key={category}
                  title={category}
                  products={products.filter(p => p.category === category)}
                  onProductClick={setSelectedProduct}
                />
              ))}
            </section>

            <AboutUs onDetailClick={() => setView("about-detail")} />
            <ContactUs onSendMessage={sendContactMessage} />
          </motion.main>
        ) : view === "about-detail" ? (
          <motion.div
            key="about-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AboutDetail onBack={() => setView("home")} />
          </motion.div>
        ) : (
          <motion.div
            key="admin"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <AdminDashboard 
              products={products}
              orders={orders}
              messages={messages}
              onAddProduct={addProduct}
              onDeleteProduct={deleteProduct}
              onDeleteMessage={deleteMessage}
              onUpdateStatus={updateOrderStatus}
              onClearOrders={clearOrders}
              onDeleteOrder={deleteOrder}
              onLogout={logout}
              onHomeClick={() => setView("home")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onOrder={handleOrder}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lastOrder && (
          <OrderConfirmation 
            orderId={lastOrder.orderId}
            orderNumber={lastOrder.orderNumber}
            onClose={() => setLastOrder(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

function Coffee({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}

