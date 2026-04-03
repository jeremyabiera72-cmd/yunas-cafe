import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product, Category } from "../types";
import ProductCard from "./ProductCard";

interface MenuSectionProps {
  title: Category;
  products: Product[];
  onProductClick: (product: Product) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, products, onProductClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-16 relative">
      <h3 className="font-serif text-2xl font-bold text-[#4B0000] mb-8 px-4">{title}</h3>
      <div className="relative group">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 backdrop-blur-sm shadow-md rounded-full text-[#B22222] opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={24} />
        </button>
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="snap-start">
                <ProductCard product={product} onClick={onProductClick} />
              </div>
            ))
          ) : (
            <div className="flex gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-64 md:w-72 aspect-square bg-black/10 animate-pulse rounded-sm" />
              ))}
            </div>
          )}
        </div>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 backdrop-blur-sm shadow-md rounded-full text-[#B22222] opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default MenuSection;
