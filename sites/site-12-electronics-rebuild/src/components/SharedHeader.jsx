import React from 'react';
import { Command, ShieldCheck, Cpu, Sparkles, Zap, Layout, Brain, Mountain, Lock, ShoppingBag, Terminal, Waves } from 'lucide-react';

const icons = {
  saas: <Brain className="text-white w-5 h-5" />,
  gaming: <Zap className="text-white w-5 h-5" />,
  travel: <Waves className="text-white w-5 h-5" />,
  pet: <Sparkles className="text-white w-5 h-5" />,
  fintech: <Layout className="text-white w-5 h-5" />,
  vpn: <Lock className="text-white w-5 h-5" />,
  wfh: <Layout className="text-white w-5 h-5" />,
  outdoor: <Mountain className="text-white w-5 h-5" />,
  smarthome: <Cpu className="text-white w-5 h-5" />,
  aiproductivity: <Brain className="text-white w-5 h-5" />,
  fashion: <ShoppingBag className="text-white w-5 h-5" />,
  electronics: <Terminal className="text-white w-5 h-5" />
};

const brandNames = {
  saas: "SAAS AUDIT",
  gaming: "GAMING HUB",
  travel: "TRAVEL ATELIER",
  pet: "PET CARE",
  fintech: "FINTECH TERMINAL",
  vpn: "PRIVACY HUB",
  wfh: "WFH GEAR",
  outdoor: "OUTDOOR HQ",
  smarthome: "ECOSYSTEM",
  aiproductivity: "AI HUB",
  fashion: "VOGUE TECH",
  electronics: "HARD-WARE"
};

const SharedHeader = ({ niche }) => {
  const brand = brandNames[niche] || "MEDIA HUB";
  const icon = icons[niche] || <Command className="text-white w-5 h-5" />;

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-gray-100 dark:bg-black/70 dark:border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-black dark:bg-white/10 rounded-xl flex items-center justify-center shadow-lg shadow-black/5">
            {icon}
          </div>
          <span className="text-lg font-black tracking-tighter text-gray-900 dark:text-white uppercase uppercase">
            {brand}
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] transition-all">
          <a href="#hero" className="hover:text-black dark:hover:text-white transition-colors">Vision</a>
          <a href="#deals" className="hover:text-black dark:hover:text-white transition-colors">Audits</a>
          <a href="#magazine" className="hover:text-black dark:hover:text-white transition-colors">Daily Feed</a>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-black text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400 px-4 py-2 rounded-full border border-green-100 dark:border-green-500/20 uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3" />
            PARTNER VERIFIED
          </div>
          <div className="text-[10px] font-black text-gray-900 dark:text-white border-l border-gray-200 dark:border-white/10 pl-6 uppercase tracking-widest leading-none">
            Marvin<br/><span className="text-[8px] text-gray-400">Sluis</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SharedHeader;
