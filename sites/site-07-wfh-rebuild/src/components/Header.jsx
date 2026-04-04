import React from 'react';
import { Home, Monitor, Coffee, Layout } from 'lucide-react';

const Header = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-[#FAF9F6]/80 backdrop-blur-lg border-b border-[#E5E5E0]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-stone-800 rounded-lg flex items-center justify-center">
            <Layout className="text-[#FAF9F6] w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter text-stone-800 leading-none uppercase">WFH GEAR HUB</span>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Design Your Sanctuary</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10 text-[10px] font-black text-stone-500 uppercase tracking-widest">
          <a href="#gear" className="hover:text-stone-800 transition-colors">Ergo Chairs</a>
          <a href="#gear" className="hover:text-stone-800 transition-colors">Standing Desks</a>
          <a href="#gear" className="hover:text-stone-800 transition-colors">Lighting</a>
          <a href="#gear" className="hover:text-stone-800 transition-colors">Workspace Tours</a>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 group cursor-pointer border-l border-stone-200 pl-6 ml-6">
             <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center font-black text-xs text-stone-600">M</div>
             <span className="text-sm font-bold text-stone-800">Marvin</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
