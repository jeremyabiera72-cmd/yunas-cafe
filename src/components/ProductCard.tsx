import { motion } from "motion/react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5 }}
      onClick={() => onClick(product)}
      className="group cursor-pointer flex-shrink-0 w-64 md:w-72"
    >
      <div className="relative aspect-square bg-black overflow-hidden rounded-sm mb-4 shadow-lg">
        <img 
          src={product.imageUrl || `https://picsum.photos/seed/${product.id}/400/400`}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
      </div>
      <div className="text-center">
        <h3 className="font-serif text-xl font-bold text-[#4B0000] mb-1">{product.name}</h3>
        <p className="text-[#B22222] font-medium">₱{product.price}</p>
      </div>
    </motion.div>
  );
}
