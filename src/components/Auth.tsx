import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "motion/react";
import { LogIn, LogOut, User, ShieldCheck } from "lucide-react";

interface AuthProps {
  user: any;
  isAdmin: boolean;
}

export default function Auth({ user, isAdmin }: AuthProps) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-4 bg-white/50 p-2 pr-4 rounded-full border border-[#B22222]/10">
        <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full border-2 border-[#B22222]" />
        <div className="hidden md:block">
          <p className="text-xs font-bold text-[#4B0000] flex items-center gap-1">
            {user.displayName}
            {isAdmin && <ShieldCheck size={14} className="text-[#B22222]" />}
          </p>
          <p className="text-[10px] text-[#4B0000]/60">{user.email}</p>
        </div>
        <button 
          onClick={handleLogout}
          className="p-2 text-[#B22222] hover:bg-[#B22222]/10 rounded-full transition-colors"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLogin}
      disabled={loading}
      className="flex items-center gap-2 px-6 py-2 bg-[#B22222] text-white rounded-full font-bold hover:bg-[#4B0000] transition-colors shadow-lg disabled:opacity-50"
    >
      <LogIn size={18} />
      {loading ? "Logging in..." : "Admin Login"}
    </motion.button>
  );
}
