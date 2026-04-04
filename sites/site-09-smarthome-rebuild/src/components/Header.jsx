import React from 'react';
import { Cpu, Home, Zap, Radio } from 'lucide-react';

const Header = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-slate-900 leading-none">AUTO HUB</span>
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mt-1">Smart Living Audited</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <a href="#gear" className="hover:text-purple-600 transition-colors">Smart Locks</a>
          <a href="#gear" className="hover:text-purple-600 transition-colors">Robot Vacuums</a>
          <a href="#gear" className="hover:text-purple-600 transition-colors">Lighting</a>
          <a href="#gear" className="hover:text-purple-600 transition-colors">Matter Tools</a>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 group cursor-pointer border-l border-slate-100 pl-6 ml-6">
             <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-black text-xs text-indigo-600 shadow-sm">M</div>
             <span className="text-sm font-bold text-slate-800">Marvin</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
