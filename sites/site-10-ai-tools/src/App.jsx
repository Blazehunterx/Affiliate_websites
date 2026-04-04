import React from 'react';
import Header from './components/Header';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Star, Check, ExternalLink, Cpu, Activity, LayoutGrid, Terminal, Video, MessageSquare } from 'lucide-react';

const ToolCard = ({ tool }) => (
  <div className="ai-card p-10 group relative border-b-8 border-transparent hover:border-indigo-500 transition-all duration-700">
    <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-600/20 transition-all duration-700" />
    
    <div className="flex items-start justify-between mb-12 relative z-10">
       <div className="w-20 h-20 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
          <tool.icon className="w-10 h-10 text-indigo-400 group-hover:scale-110 transition-transform" />
       </div>
       <div className="flex flex-col items-end gap-2">
          <div className="px-4 py-2 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest border border-indigo-500/20 flex items-center gap-2">
             <Star className="w-3.5 h-3.5 fill-indigo-400" /> {tool.score} AI ROI
          </div>
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{tool.category}</span>
       </div>
    </div>

    <div className="mb-12 relative z-10">
       <h3 className="text-4xl font-headers font-bold text-white mb-4 tracking-tight leading-none uppercase">{tool.name}</h3>
       <p className="text-sm font-medium text-slate-400 leading-relaxed italic opacity-80 border-l-4 border-indigo-500/20 pl-8">
          {tool.description}
       </p>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-12 relative z-10">
       {tool.useCases.map((u, i) => (
         <div key={i} className="flex items-center gap-2 py-3 px-4 bg-white/5 border border-white/5 rounded-xl">
            <Check className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{u}</span>
         </div>
       ))}
    </div>

    <a href={tool.url} target="_blank" className="w-full h-18 bg-white text-black hover:bg-gradient-to-tr from-indigo-600 to-pink-600 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all shadow-xl active:scale-95 group/btn relative z-10">
       ACTIVATE FLOW <ExternalLink className="w-4 h-4 group-hover/btn:rotate-12 transition-all" />
    </a>
  </div>
);

const toolData = [
  { 
    name: "Jasper.ai", 
    icon: MessageSquare,
    score: "9.6", 
    category: "Copywriting",
    description: "Institutional engine for decentralized content orchestration and brand-voice parity.",
    useCases: ["Blog Audit", "Ad Ops", "SEO Nodes"],
    url: "https://jasper.ai"
  },
  { 
    name: "Replicate Node", 
    icon: Terminal,
    score: "9.8", 
    category: "Model Deployment",
    description: "The infrastructure standard for running open-source generative nodes at institutional scale.",
    useCases: ["Stable Diff", "Llama Audit", "API Flow"],
    url: "https://replicate.com"
  },
  { 
    name: "Runway Gen-3", 
    icon: Video,
    score: "9.4", 
    category: "Motion Audit",
    description: "Advanced synthetic video architecture for high-velocity branding and visual telemetry.",
    useCases: ["Physics Audit", "High-FPS", "Motion Flow"],
    url: "https://runwayml.com"
  }
];

function App() {
  return (
    <div className="bg-[#020617] min-h-screen pt-40 pb-60 text-slate-100 font-body antialiased selection:bg-indigo-500/30 overflow-x-hidden relative">
      <Header />

      <main className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Synthetic Hero */}
        <section className="mb-80 grid lg:grid-cols-2 gap-40 items-center">
           <div className="text-left">
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full text-[10px] font-black tracking-[0.5em] uppercase mb-16">
                 <Zap className="w-5 h-5 text-indigo-500 animate-pulse" /> SYNTHETIC REPORT 2026
              </div>
              <h1 className="text-[12rem] lg:text-[16rem] font-headers font-extrabold leading-[0.7] -tracking-[0.06em] uppercase mb-16">
                 Synth.<br/>
                 <span className="iridescent-text italic px-4">AI Nodes.</span>
              </h1>
              <p className="text-3xl text-slate-400 font-bold leading-[1.6] max-w-xl italic opacity-80 border-l-[16px] border-indigo-600 pl-16 mb-20 shadow-2xl">
                 We benchmark the worlds most advanced synthetic architectures for institutional ROI and workflow integration parity.
              </p>
              
              <div className="flex flex-wrap gap-8">
                 <button className="px-12 py-6 bg-white text-black rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(99,102,241,0.2)] active:scale-95 transition-all">
                    START THE AUDIT
                 </button>
                 <button className="px-12 py-6 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-all">
                    VIEW INFRASTRUCTURE
                 </button>
              </div>
           </div>

           <div className="relative">
              <div className="aspect-square rounded-[5rem] overflow-hidden border border-white/10 shadow-2xl relative group cursor-pointer">
                 <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 via-purple-900/40 to-pink-900/40 opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />
                 <Cpu className="w-80 h-80 text-white opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-1000" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center">
                    <p className="text-6xl font-headers font-black italic uppercase leading-none mb-8 tracking-tighter">Synthetic<br/>Audit v1.0</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.8em] text-indigo-400">Verified Node 10</p>
                 </div>
              </div>
              {/* Floating Pulse Node */}
              <div className="absolute -top-10 -left-10 p-10 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl rotate-[-6deg] hidden xl:block">
                 <Activity className="text-pink-500 w-12 h-12 mb-6 animate-pulse" />
                 <p className="text-4xl font-headers font-bold text-white mb-2 leading-none">99.4%</p>
                 <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Inference Bench</p>
              </div>
           </div>
        </section>

        {/* The Directory */}
        <section id="directory" className="mb-60">
           <div className="flex items-center gap-12 mb-32">
              <div className="w-32 h-2 bg-gradient-to-r from-indigo-600 to-transparent rounded-full" />
              <h2 className="text-7xl font-headers font-bold uppercase tracking-tighter">The Synthetic Matrix</h2>
              <div className="flex-grow h-[1px] bg-white/5" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {toolData.map((tool, i) => (
                 <ToolCard key={i} tool={tool} />
              ))}
           </div>
        </section>

        {/* AI Research Pillar */}
        <section className="bg-white/2 p-24 rounded-[6rem] border border-white/5 grid lg:grid-cols-12 gap-32 items-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/5 to-pink-600/5 pointer-events-none" />
           <div className="lg:col-span-5 aspect-square rounded-[4rem] overflow-hidden border border-white/10 shadow-inner p-20 flex items-center justify-center">
              <Terminal className="w-60 h-60 text-indigo-500 opacity-20" />
           </div>
           <div className="lg:col-span-7 text-left space-y-16">
              <h3 className="text-[8rem] font-headers font-extrabold leading-[0.8] uppercase tracking-tighter border-l-[40px] border-indigo-600 pl-20">Inference.<br/><span className="iridescent-text italic">Audit.</span></h3>
              <p className="text-2xl text-slate-500 font-bold leading-relaxed italic opacity-80 pl-12 border-l-4 border-white/10">
                 We analyze model behavior over billions of tokens to ensure prompt adherence and toxicity parity meeting European institutional standards. Our inference matrix is the benchmark for decentralized AI acquisition.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 pt-10">
                 <div className="space-y-4">
                    <ShieldCheck className="text-indigo-500 w-12 h-12" />
                    <p className="text-xl font-headers font-bold uppercase tracking-widest leading-none">Safe Nodes</p>
                    <p className="text-[10px] font-medium text-slate-500 italic">Fully audited for bias and hallucination parity.</p>
                 </div>
                 <div className="space-y-4">
                    <Zap className="text-pink-500 w-12 h-12" />
                    <p className="text-xl font-headers font-bold uppercase tracking-widest leading-none">High Token</p>
                    <p className="text-[10px] font-medium text-slate-500 italic">Verified throughput for institutional WFH setups.</p>
                 </div>
                 <div className="space-y-4">
                    <Cpu className="text-slate-400 w-12 h-12" />
                    <p className="text-xl font-headers font-bold uppercase tracking-widest leading-none">API Seed</p>
                    <p className="text-[10px] font-medium text-slate-500 italic">Centralized access to the world's leading generative nodes.</p>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <footer className="mt-60 py-40 border-t border-white/5 bg-[#020617]">
         <div className="max-w-7xl mx-auto px-8 flex flex-col items-center gap-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <Sparkles className="w-16 h-16 text-indigo-600" />
            <p className="text-[10px] font-black uppercase tracking-[0.8em]">Verified Synthetic Architecture 2026</p>
            <div className="flex gap-12 text-xs font-black uppercase tracking-widest">
               <a href="#">Model Registry</a>
               <a href="#">Audit Protocols</a>
               <a href="#">Partner Nodes</a>
            </div>
         </div>
      </footer>
    </div>
  );
}

export default App;
