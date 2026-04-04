import React from 'react';
import { Sparkles, Search, Menu, Zap, Globe, Cpu, LayoutGrid } from 'lucide-react';

const Header = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-[#020617]/80 backdrop-blur-3xl border-b border-white/5 px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="p-3 bg-gradient-to-tr from-indigo-600 to-pink-600 rounded-2xl group-hover:scale-110 transition-transform shadow-xl shadow-indigo-600/20">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-headers font-extrabold tracking-tighter text-white uppercase">Synth.<span className="iridescent-text italic">AI</span></span>
            <span className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-500">Automated Intelligence Audit</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-12 text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">
           <a href="#directory" className="hover:text-indigo-400 transition-colors">Generative Nodes</a>
           <a href="#directory" className="hover:text-indigo-400 transition-colors">Workflow Audits</a>
           <a href="#directory" className="hover:text-indigo-400 transition-colors">API Pricing</a>
        </div>

        <div className="flex items-center gap-6">
           <div className="hidden sm:flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black tracking-widest text-slate-300">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping mr-2" /> 
              SYNTHETIC PULSE: ACTIVE
           </div>
           <button className="p-4 bg-white text-black rounded-2xl hover:bg-gradient-to-tr from-indigo-600 to-pink-600 hover:text-white transition-all">
              <LayoutGrid className="w-6 h-6" />
           </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
