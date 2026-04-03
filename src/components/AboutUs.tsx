import { motion } from "motion/react";

interface AboutUsProps {
  onDetailClick: () => void;
}

export default function AboutUs({ onDetailClick }: AboutUsProps) {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <h2 className="font-serif text-4xl font-bold text-[#4B0000] text-center mb-16">About Yuna's Coffee Shop</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
        {/* Overlapping Images Design */}
        <div className="relative w-72 h-72 md:w-96 md:h-96">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute top-0 left-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10"
          >
            <img 
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800" 
              alt="Premium coffee beans"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute bottom-0 right-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <img 
              src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&q=80&w=800" 
              alt="Perfectly brewed coffee"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="max-w-md text-center md:text-left">
          <h3 className="font-serif text-3xl font-bold text-[#4B0000] mb-4">Our Story</h3>
          <p className="text-[#4B0000]/80 leading-relaxed mb-8">
            "Founded with a love for the perfect brew, Yuna's Coffee Shop began as a small dream to bring people together over exceptional coffee. We source only the finest beans and roast them to perfection, ensuring every sip is a moment of pure bliss. Whether you're here for a quick morning pick-me-up or a cozy afternoon retreat, we welcome you to our coffee family."
          </p>
          
          <div className="space-y-2 text-[#4B0000] font-medium">
            <p><span className="text-[#B22222]">Address:</span> Mlang, Rizal Street</p>
            <p><span className="text-[#B22222]">Number:</span> 09123456789</p>
            <p><span className="text-[#B22222]">Owner:</span> Jeremy E. Abiera</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDetailClick}
            className="mt-10 px-10 py-3 bg-black text-white font-serif text-lg hover:bg-[#B22222] transition-colors rounded-sm"
          >
            Click here!
          </motion.button>
        </div>
      </div>
    </section>
  );
}
