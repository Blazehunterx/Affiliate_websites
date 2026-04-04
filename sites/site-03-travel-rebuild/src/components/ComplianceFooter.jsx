import React from 'react';
import { Shield, FileText, Scale, ExternalLink } from 'lucide-react';

export const ComplianceFooter = () => {
  return (
    <div className="bg-slate-50 border-t border-slate-200 mt-20 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Mandatory Affiliate Disclosure */}
        <div className="flex flex-col md:flex-row items-start gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm mb-12">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-3">Audited Media Property</h4>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
               This digital media property is audited and managed by the **Marvin Sluis Media Group**. 
               Our mission is to help you find the best value through rigorous personal audits and transparent 
               affiliate reporting. We may earn a commission if you click our links, but our editorial integrity 
               is never compromised.
            </p>
          </div>
        </div>

        {/* Social Trust row */}
        <div className="flex justify-center gap-8 mb-12">
          <a href="https://www.linkedin.com/in/marvin-van-der-sluis-6b322a178/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-all hover:scale-110">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="https://x.com/MarvinSluis" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-black transition-all hover:scale-110 font-bold text-xl">𝕏</a>
          <a href="https://instagram.com/marvinsluis" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-600 transition-all hover:scale-110">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.011 3.585-.069 4.85c-.149 3.248-1.687 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.849-.07c-3.264-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.012-3.584.07-4.849c.149-3.249 1.691-4.771 4.919-4.919 1.265-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.337 2.615 6.76 6.98 6.96 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.339-.2 6.76-2.612 6.96-6.98.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.338-2.612-6.76-6.98-6.96-1.28-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] pt-8 border-t border-slate-200/60">
          <a href="#privacy" className="hover:text-blue-500 transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" /> Privacy Policy
          </a>
          <a href="#terms" className="hover:text-blue-500 transition-colors flex items-center gap-2">
            <Scale className="w-4 h-4" /> Terms of Service
          </a>
          <span className="flex items-center gap-2 opacity-80">
            <ExternalLink className="w-4 h-4" /> &copy; {new Date().getFullYear()} Marvin Sluis Media Group
          </span>
        </div>
      </div>
    </div>
  );
};
