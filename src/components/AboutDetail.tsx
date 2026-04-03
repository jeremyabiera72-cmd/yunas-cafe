import React from "react";
import { motion } from "motion/react";
import { Coffee, MapPin, Calendar, TrendingUp, Users, Award, ArrowLeft } from "lucide-react";

interface AboutDetailProps {
  onBack: () => void;
}

export default function AboutDetail({ onBack }: AboutDetailProps) {
  return (
    <div className="min-h-screen bg-[#FDF5E6] pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#B22222] font-bold mb-8 hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#B22222]/10"
        >
          {/* Hero Image */}
          <div className="h-[400px] relative">
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200" 
              alt="Cafe Interior"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:p-12">
              <div>
                <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-2">Yuna's Coffee Shop</h1>
                <p className="text-white/80 text-lg">Est. 2025 • Premium Coffee Experience</p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-16">
            {/* Mission & History */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold text-[#4B0000] mb-6 flex items-center gap-3">
                  <Award className="text-[#B22222]" />
                  Our Heritage
                </h2>
                <p className="text-[#4B0000]/80 leading-relaxed mb-6 italic">
                  "It all started in a small kitchen with a single bag of beans and a passion for the perfect roast."
                </p>
                <p className="text-[#4B0000]/80 leading-relaxed">
                  Yuna's Coffee Shop was created in the heart of the city with a simple mission: to serve more than just coffee. We wanted to create a sanctuary where every cup is a masterpiece and every customer is family. Our journey began when Jeremy E. Abiera decided to share his unique roasting techniques with the world.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=600" 
                  alt="Coffee Roasting"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Analytics/Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard icon={<Users />} label="Happy Customers" value="5,000+" />
              <StatCard icon={<Coffee />} label="Cups Served" value="12,000+" />
              <StatCard icon={<Award />} label="Awards Won" value="12" />
              <StatCard icon={<TrendingUp />} label="Growth Rate" value="45%" />
            </div>

            {/* Area & Location */}
            <div className="bg-[#FDF5E6] rounded-2xl p-8 md:p-12 border border-[#B22222]/5">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                  <h2 className="font-serif text-3xl font-bold text-[#4B0000] mb-6 flex items-center gap-3">
                    <MapPin className="text-[#B22222]" />
                    Our Location
                  </h2>
                  <div className="space-y-4 text-[#4B0000]/80">
                    <p className="font-bold text-lg">Main Branch: Mlang, Rizal street</p>
                    <p>purok 4 Mlang, Rizal street </p>
                    <p>Our shop is located in a vibrant neighborhood known for its artistic community and love for artisanal products. We chose this area because it perfectly matches our creative spirit.</p>
                  </div>
                </div>
                <div className="flex-1 rounded-xl overflow-hidden h-64 shadow-inner border-2 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600" 
                    alt="Cafe Atmosphere"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Coffee Information */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#4B0000] mb-8 text-center">The Art of Our Coffee</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <CoffeeInfoCard 
                  title="The Beans" 
                  desc="We source 100% Arabica beans from sustainable farms in the highlands."
                />
                <CoffeeInfoCard 
                  title="The Roast" 
                  desc="Our signature medium-dark roast brings out chocolatey and nutty undertones."
                />
                <CoffeeInfoCard 
                  title="The Brew" 
                  desc="Every cup is prepared using precise temperature control and timing."
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="text-center p-6 bg-[#FDF5E6]/50 rounded-2xl border border-[#B22222]/5">
      <div className="text-[#B22222] flex justify-center mb-3">{icon}</div>
      <p className="text-2xl font-bold text-[#4B0000] mb-1">{value}</p>
      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{label}</p>
    </div>
  );
}

function CoffeeInfoCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <h4 className="font-serif text-xl font-bold text-[#B22222] mb-3">{title}</h4>
      <p className="text-sm text-[#4B0000]/70 leading-relaxed">{desc}</p>
    </div>
  );
}
