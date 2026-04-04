import React from 'react';
import { Box, Command, Search, ShieldCheck } from 'lucide-react';

const Header = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Command className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">SAAS HUB</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <a href="#comparison" className="hover:text-black transition-colors">AI Tools</a>
          <a href="#features" className="hover:text-black transition-colors">Automation</a>
          <a href="#comparison" className="hover:text-black transition-colors">Comparison</a>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            PARTNER VERIFIED
          </div>
          <div className="text-sm font-bold text-gray-900 border-l border-gray-200 pl-6">
            Marvin
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
