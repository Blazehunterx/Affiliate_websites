import React from 'react';
import { Gamepad2, Search, User } from 'lucide-react';

const Header = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0B0F19]/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gamepad2 className="text-purple-500 w-8 h-8" />
          <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            GAME DEALS HUB
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#deals" className="hover:text-white transition-colors">PC Games</a>
          <a href="#deals" className="hover:text-white transition-colors">PlayStation</a>
          <a href="#deals" className="hover:text-white transition-colors">Xbox</a>
          <a href="#deals" className="hover:text-white transition-colors">Nintendo</a>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search games..." 
              className="bg-gray-900 border border-gray-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-64"
            />
          </div>
          <div className="flex items-center gap-2 text-sm font-medium border-l border-gray-800 pl-4 ml-4">
            <User className="w-4 h-4 text-purple-500" />
            <span>Marvin</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
