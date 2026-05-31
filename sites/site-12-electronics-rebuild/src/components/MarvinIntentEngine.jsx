import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MarvinIntentEngine = ({ primaryColor = '#3b82f6', niche = 'General' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      // Trigger if mouse leaves toward the top (address bar) and hasn't triggered yet this session
      if (e.clientY <= 0 && !hasTriggered) {
        const sessionLock = sessionStorage.getItem('marvin_intent_lock');
        if (!sessionLock) {
          setIsVisible(true);
          setHasTriggered(true);
          sessionStorage.setItem('marvin_intent_lock', 'true');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasTriggered]);

  const deals = {
    Gaming: [
      { name: 'RTX 4080 Super', drop: '-15%', price: '€949' },
      { name: 'Logitech G Pro X 2', drop: '-22%', price: '€189' }
    ],
    General: [
      { name: 'Samsung 990 Pro 2TB', drop: '-30%', price: '€145' },
      { name: 'Sony WH-1000XM5', drop: '-18%', price: '€299' }
    ]
  };

  const activeDeals = deals[niche] || deals.General;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden"
            style={{ borderColor: `${primaryColor}33` }}
          >
            {/* Background Glow */}
            <div 
              className="absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-20"
              style={{ backgroundColor: primaryColor }}
            />

            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <div className="px-4 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  The Sniper's Advantage
                </div>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
                  Wait. <span style={{ color: primaryColor }}>Price Drop</span> Detected.
                </h2>
                <p className="text-zinc-400 font-light leading-relaxed">
                  Our agents just flagged investment-grade opportunities in the {niche} sector. Don't leave empty-handed.
                </p>
              </div>

              <div className="space-y-3">
                {activeDeals.map((deal, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/20 transition-all">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-zinc-300">{deal.name}</div>
                      <div className="text-[10px] font-black uppercase text-zinc-500">Integrity Verified</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black" style={{ color: primaryColor }}>{deal.drop}</div>
                      <div className="text-[10px] font-bold text-zinc-500 line-through">{deal.price}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                className="w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl"
                style={{ backgroundColor: primaryColor, color: '#000' }}
              >
                Access Full Price Matrix
              </button>

              <p className="text-center text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600">
                Powered by Marvin Sluis Intelligence v2.0
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MarvinIntentEngine;
