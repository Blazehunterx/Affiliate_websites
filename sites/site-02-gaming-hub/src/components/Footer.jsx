import React from 'react';
import { Mail, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-gray-800 bg-[#0B0F19] py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h4 className="font-bold text-white mb-4">AFFILIATE DISCLOSURE</h4>
          <p className="text-sm text-gray-500 leading-relaxed">
            Every deal on this site is manually verified. At no extra cost to you, we may earn a commission when you purchase through our links. This keeps the price tracker free for everyone.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-4">CONTACT & SUPPORT</h4>
          <div className="space-y-2 text-sm text-gray-500">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-500" />
              Marvin.2000.sluis@gmail.com
            </p>
            <p>Admin: Marvin Sluis</p>
            <p>Region: EU / NL / UK / Global</p>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">SECURITY FIRST</h4>
          <div className="flex items-center gap-3 p-4 bg-gray-900 rounded-xl border border-gray-800">
            <Shield className="w-8 h-8 text-green-500" />
            <p className="text-[10px] text-gray-400 leading-tight uppercase">
              We separate official stores from keyshops to protect your account.
              <br/><span className="text-white font-bold">100% VERIFIED DEALS ONLY.</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center text-[10px] text-gray-600 uppercase tracking-widest border-t border-gray-900 pt-8">
        &copy; 2026 GAME DEALS HUB. DEVELOPED FOR MARVIN.
      </div>
    </footer>
  );
};

export default Footer;
