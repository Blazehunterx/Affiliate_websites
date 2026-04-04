import React from 'react';
import { Wallet, Shield, BarChart3, Menu } from 'lucide-react';

const Header = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <BarChart3 className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-black tracking-tight text-white leading-none">FINTECH DEALS</span>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-sm font-bold text-slate-400">
          <a href="#offers" className="hover:text-emerald-400 transition-colors">Neo-Banks</a>
          <a href="#offers" className="hover:text-emerald-400 transition-colors">Credit Cards</a>
          <a href="#offers" className="hover:text-emerald-400 transition-colors">Savings</a>
          <a href="#offers" className="hover:text-emerald-400 transition-colors">Investing</a>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-3 pr-6 border-r border-white/10">
             <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-xs text-white">M</div>
             <span className="text-sm font-bold text-white">Marvin</span>
          </div>
          <button className="text-slate-400 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
