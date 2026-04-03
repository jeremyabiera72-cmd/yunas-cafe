import { motion } from "motion/react";
import { CheckCircle, X } from "lucide-react";

interface OrderConfirmationProps {
  orderId: string;
  orderNumber: number;
  onClose: () => void;
}

export default function OrderConfirmation({ orderId, orderNumber, onClose }: OrderConfirmationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-[#FDF5E6] p-8 md:p-12 rounded-sm shadow-2xl max-w-md w-full relative border-l-8 border-[#B22222] text-center"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#4B0000]/40 hover:text-[#B22222] transition-colors"
        >
          <X size={24} />
        </button>

        <div className="w-20 h-20 bg-[#B22222]/10 rounded-full flex items-center justify-center text-[#B22222] mx-auto mb-8">
          <CheckCircle size={48} />
        </div>

        <h2 className="font-serif text-3xl font-bold text-[#4B0000] mb-4">Order Placed!</h2>
        <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-lg mb-6 flex flex-col gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-2 rounded-full text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <p className="text-sm font-bold text-yellow-800 leading-tight">
              IMPORTANT: Please screenshot or save this information for your reference!
            </p>
          </div>
          <div className="pt-2 border-t border-yellow-200">
            <p className="text-[10px] text-yellow-700 font-medium">
              If your delivery is already done or you did not receive it, please contact us immediately through our contact page.
            </p>
          </div>
        </div>
        <p className="text-[#4B0000]/70 mb-8 leading-relaxed">
          Thank you for choosing Yuna's Cafe. Your order has been successfully received.
        </p>

        <div className="space-y-4 mb-10">
          <div className="bg-white p-4 rounded-sm border border-[#B22222]/10 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-[#B22222] font-bold mb-1">Order Number</p>
            <p className="text-4xl font-serif font-bold text-[#4B0000]">#{orderNumber}</p>
          </div>
          <div className="bg-white p-4 rounded-sm border border-[#B22222]/10 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-[#B22222] font-bold mb-1">Order ID</p>
            <p className="text-2xl font-mono font-bold text-[#4B0000]">{orderId}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 bg-black text-white font-serif text-xl hover:bg-[#B22222] transition-colors rounded-sm shadow-lg"
        >
          Got it!
        </button>
      </motion.div>
    </motion.div>
  );
}
