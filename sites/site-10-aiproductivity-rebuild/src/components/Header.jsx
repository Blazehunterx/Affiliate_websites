import React from 'react';
import { Sparkles, Command, Zap, Search } from 'lucide-react';

const Header = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white/50 backdrop-blur-2xl border-b border-indigo-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-500">
            <Sparkles className="text-white w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter text-slate-900 leading-none">AI PRODUCTIVITY</span>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">Knowledge Audited</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-12 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          <a href="#tools" className="hover:text-indigo-600 transition-colors">Top Tools</a>
          <a href="#matrix" className="hover:text-indigo-600 transition-colors">Comparison Matrix</a>
          <a href="#tools" className="hover:text-indigo-600 transition-colors">Data Agents</a>
          <a href="#tools" className="hover:text-indigo-600 transition-colors">Daily Stack</a>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 group cursor-pointer border-l border-indigo-50 pl-6 ml-6">
             <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-black text-xs text-indigo-600">M</div>
             <span className="text-sm font-bold text-slate-800">Marvin</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
