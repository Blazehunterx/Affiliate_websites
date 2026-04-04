import React from 'react';
import { Heart, Search, Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-blue-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Heart className="text-white w-6 h-6 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-slate-800 leading-none">PET CARE HUB</span>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1">Tech for Happy Pets</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
          <a href="#products" className="hover:text-blue-500 transition-colors">GPS Trackers</a>
          <a href="#products" className="hover:text-blue-500 transition-colors">Smart Feeders</a>
          <a href="#products" className="hover:text-blue-500 transition-colors">Health Monitors</a>
          <a href="#products" className="hover:text-blue-500 transition-colors">Compare All</a>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 pr-4 border-r border-slate-100">
             <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center font-black text-xs text-white">M</div>
             <span className="text-sm font-bold text-slate-700">Marvin</span>
          </div>
          <button className="bg-slate-100 p-2 rounded-xl hover:bg-slate-200 transition-colors">
            <Search className="w-5 h-5 text-slate-500" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
