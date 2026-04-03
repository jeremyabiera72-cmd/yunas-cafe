import { Coffee } from "lucide-react";
import { motion } from "motion/react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FDF5E6] flex flex-col items-center justify-center gap-6">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-24 h-24 bg-[#B22222] rounded-full flex items-center justify-center text-white shadow-2xl"
      >
        <Coffee size={48} />
      </motion.div>
      <div className="text-center">
        <h2 className="font-serif text-3xl font-bold text-[#4B0000] mb-2">Yuna's Cafe</h2>
        <p className="text-[#B22222] font-bold tracking-widest uppercase text-xs animate-pulse">Brewing your experience...</p>
      </div>
    </div>
  );
}
