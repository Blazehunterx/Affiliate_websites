import React from 'react';
import { Shield, Eye, Lock, Terminal } from 'lucide-react';

const Header = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-[#030712]/90 backdrop-blur-xl border-b border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(8,145,178,0.3)] group-hover:shadow-[0_0_30px_rgba(8,145,178,0.5)] transition-shadow">
            <Lock className="text-white w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter text-white leading-none">PRIVACY HUB</span>
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest mt-1">Status: Encrypted</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <a href="#deals" className="hover:text-cyan-400 transition-colors">VPN Top 10</a>
          <a href="#deals" className="hover:text-cyan-400 transition-colors">Privacy Tools</a>
          <a href="#deals" className="hover:text-cyan-400 transition-colors">Audit Reports</a>
          <a href="#deals" className="hover:text-cyan-400 transition-colors">Speed Tests</a>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-cyan-500/5 rounded-lg border border-cyan-500/20">
             <Terminal className="w-3.5 h-3.5 text-cyan-500" />
             <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">MARVIN_SEC</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
