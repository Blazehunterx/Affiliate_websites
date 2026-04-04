import React from 'react';
import { Trees, MapPin, Search, Calendar } from 'lucide-react';

const Header = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trees className="text-[#3A5A40] w-9 h-9" />
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-[#344E41]">HOLIDAY EXPLORER</span>
            <span className="text-[10px] font-bold text-[#A3B18A] uppercase tracking-widest">Premium NL Parks</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-sm font-semibold text-gray-600">
          <a href="#parks" className="hover:text-[#344E41] transition-colors">Coastal Parks</a>
          <a href="#parks" className="hover:text-[#344E41] transition-colors">Forest Lodges</a>
          <a href="#parks" className="hover:text-[#344E41] transition-colors">Subtropical Pools</a>
          <a href="#parks" className="hover:text-[#344E41] transition-colors">Last Minute</a>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-full border-2 border-[#DAD7CD] flex items-center justify-center group-hover:border-[#344E41] transition-colors overflow-hidden">
               <span className="text-sm font-black text-[#344E41]">M</span>
            </div>
            <span className="text-sm font-bold text-[#344E41]">Marvin</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
