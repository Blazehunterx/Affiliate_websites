import React from 'react';
import { ShieldCheck, ArrowUpRight, ShoppingCart } from 'lucide-react';

/**
 * Universal PriceCard v2.0
 * Standardized for Marvin Media Group (Amazon, Awin, Bonusarrive, Kinguin)
 */
const PriceCard = ({ deal }) => {
  // Determine top 3 partners based on niche
  const isGaming = deal.niche === 'gaming';
  
  const partners = [
    { name: 'Amazon', price: deal.amazon_price, link: deal.amazon_link || '#', color: 'yellow' },
    { name: isGaming ? 'Kinguin' : 'Bonusarrive', price: isGaming ? deal.keyshop_k_price : deal.bonusarrive_price, link: isGaming ? deal.keyshop_k_link : deal.bonusarrive_link || '#', color: 'orange' },
    { name: 'Awin Partner', price: deal.awin_price || deal.keyshop_a_price, link: deal.awin_link || deal.keyshop_a_link || '#', color: 'purple' }
  ].filter(p => p.price > 0 || p.link !== '#') // Show only active partners
   .sort((a,b) => (a.price || 999) - (b.price || 999));

  return (
    <div className="bg-white dark:bg-[#151B28] border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden group hover:border-purple-500/50 transition-all shadow-xl shadow-black/5">
      <div className="relative aspect-video bg-gray-50 dark:bg-black/20">
        <img 
          src={deal.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800'} 
          alt={deal.title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
        />
        {deal.discount && (
          <div className="absolute top-4 left-4 bg-purple-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
            -{deal.discount}%
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h4 className="font-black text-gray-900 dark:text-white text-lg leading-tight truncate w-full">{deal.title}</h4>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <ShieldCheck className="w-4 h-4 text-purple-500" />
          <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Trust Index: {deal.trust_score || 9.8}/10</span>
        </div>

        <div className="space-y-3">
          {/* Best Deal Highlight */}
          {partners.map((partner, i) => (
            <div key={partner.name} className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${i === 0 ? 'bg-green-500/5 border-green-500/20 shadow-lg shadow-green-500/5' : 'bg-gray-50/50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800'}`}>
              <div className="flex flex-col">
                <span className={`text-[10px] uppercase font-black tracking-tighter ${i === 0 ? 'text-green-500' : 'text-gray-400'}`}>
                  {partner.name} {i === 0 && '✨ Best Value'}
                </span>
                <span className={`text-lg font-black ${i === 0 ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                   {partner.price ? `€${partner.price.toFixed(2)}` : 'Check Price'}
                </span>
              </div>
              <a 
                href={partner.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-black text-white dark:bg-white dark:text-black hover:scale-105' : 'bg-gray-200 dark:bg-white/5 text-gray-500 hover:bg-gray-300 dark:hover:bg-white/10'}`}
              >
                Acquire Deal
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
