import { Menu, X, Coffee, User } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Auth from "./Auth";
import { useFirebase } from "../hooks/useFirebase";

interface NavbarProps {
  onAdminClick: () => void;
  onHomeClick: () => void;
}

export default function Navbar({ onAdminClick, onHomeClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user, isAdmin } = useFirebase();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${lastScrollY > 50 ? "bg-[#FDF5E6]/90 backdrop-blur-md border-b border-[#B22222]/10" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onHomeClick}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            lastScrollY > 50 ? "bg-[#B22222] text-white" : "bg-white/10 backdrop-blur-md text-white border border-white/20"
          } group-hover:scale-110 shadow-lg`}>
            <Coffee size={24} />
          </div>
          <span className={`font-serif text-2xl font-bold transition-colors duration-300 ${
            lastScrollY > 50 ? "text-[#4B0000]" : "text-white drop-shadow-lg"
          }`}>Yuna's Cafe</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-lg transition-all duration-300 shadow-lg backdrop-blur-sm ${
              lastScrollY > 50 ? "text-[#4B0000] bg-[#B22222]/5" : "text-white bg-white/5"
            }`}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-0 right-0 h-screen w-80 bg-[#FDF5E6] shadow-2xl p-8 z-[60]"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-12">
                <span className="font-serif text-2xl font-bold text-[#4B0000]">Menu</span>
                <button onClick={() => setIsOpen(false)} className="text-[#4B0000]">
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                <button 
                  onClick={() => { onHomeClick(); setIsOpen(false); }}
                  className="text-left py-3 px-4 text-[#4B0000] font-serif text-xl font-medium hover:bg-[#B22222]/10 rounded-lg transition-colors"
                >
                  Home
                </button>
                
                <div className="border-t border-[#B22222]/10 pt-6">
                  <Auth user={user} isAdmin={isAdmin} />
                </div>

                {isAdmin && (
                  <button 
                    onClick={() => { onAdminClick(); setIsOpen(false); }}
                    className="text-left py-3 px-4 text-[#4B0000] font-serif text-xl font-medium hover:bg-[#B22222]/10 rounded-lg transition-colors flex items-center gap-3"
                  >
                    <User size={24} />
                    Admin Dashboard
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

