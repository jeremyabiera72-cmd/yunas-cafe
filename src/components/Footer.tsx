import { Coffee, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#4B0000] text-white/50 py-24 text-center border-t border-white/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#B22222]/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B22222]/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white mb-6 hover:scale-110 transition-transform cursor-pointer">
            <Coffee size={32} />
          </div>
          <h2 className="font-serif text-4xl font-bold text-white mb-2">Yuna's Cafe</h2>
          <p className="text-sm tracking-[0.4em] uppercase text-white/40 font-bold">Premium Coffee Experience</p>
        </div>

        <div className="w-24 h-[1px] bg-white/20 mx-auto mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm uppercase tracking-widest font-bold mb-16">
          <div className="space-y-4">
            <p className="text-white/80">Opening Hours</p>
            <p className="text-white/40">Mon - Fri: 8am - 10pm</p>
            <p className="text-white/40">Sat - Sun: 9am - 11pm</p>
          </div>
          <div className="space-y-4">
            <p className="text-white/80">Location</p>
            <p className="text-white/40">Mlang, Rizal Street</p>
            <p className="text-white/40">Philippines</p>
          </div>
          <div className="space-y-4">
            <p className="text-white/80">Contact</p>
            <p className="text-white/40">09553673625</p>
            <p className="text-white/40">jeremyabiera72@gmail.com</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-xs flex items-center gap-2">
            Made with <Heart size={12} className="text-[#B22222] fill-[#B22222]" /> for coffee lovers
          </p>
          <p className="text-[10px] opacity-30">© 2026 Yuna's Cafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
