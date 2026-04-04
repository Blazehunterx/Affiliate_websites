import React from 'react';

const BentoGrid = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-[#0B0F19] min-h-screen text-white">
      {children}
    </div>
  );
};

const BentoCard = ({ title, subtitle, variant = 'base', children }) => {
  const variants = {
    base: 'bg-[#151B28] border border-gray-800',
    featured: 'md:col-span-2 bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-purple-500/30',
    stat: 'bg-[#151B28] border border-gray-800 flex flex-col justify-center items-center',
  };

  return (
    <div className={`p-6 rounded-2xl shadow-xl transition-all hover:scale-[1.02] ${variants[variant]}`}>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};

export { BentoGrid, BentoCard };
