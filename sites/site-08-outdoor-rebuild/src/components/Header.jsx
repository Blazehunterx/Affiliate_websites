import React from 'react';
import { Compass, Tent, Mountain, Wind } from 'lucide-react';

const Header = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-[#1A1C18]/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-[#FF6B35] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,107,53,0.3)]">
            <Compass className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white leading-none uppercase">OUTDOOR HUB</span>
            <span className="text-[10px] font-bold text-[#FF6B35] uppercase tracking-widest mt-1">Adventure Audited</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <a href="#gear" className="hover:text-white transition-colors">Rooftop Tents</a>
          <a href="#gear" className="hover:text-white transition-colors">Hiking Tech</a>
          <a href="#gear" className="hover:text-white transition-colors">Camp Cuisine</a>
          <a href="#gear" className="hover:text-white transition-colors">Expedition Kits</a>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 group cursor-pointer border-l border-white/10 pl-6 ml-6">
             <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-black text-xs text-white">M</div>
             <span className="text-sm font-bold text-white uppercase tracking-tighter">Marvin_Exp</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
