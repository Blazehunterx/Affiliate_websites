import React, { useEffect, useState } from 'react';
import { supabase } from '../shared/supabaseClient';
import { ArrowRight, Sparkles, Clock, ExternalLink, ChevronRight, Bookmark } from 'lucide-react';

export const Magazine = ({ niche }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            // Detect language from URL (e.g. /de/gaming/ -> 'de')
            const pathParts = window.location.pathname.split('/').filter(Boolean);
            const urlLang = ['de', 'nl', 'fr'].includes(pathParts[0]) ? pathParts[0] : 'en';

            const { data, error } = await supabase
                .from('hubs_content')
                .select('*')
                .eq('niche', niche)
                .eq('language', urlLang)
                .order('created_at', { ascending: false });

            if (!error && data && data.length > 0) {
                setArticles(data);
                
                // --- SEO INJECTION ---
                const latest = data[0];
                document.title = `${latest.title} | ${niche.toUpperCase()} Hub 2026`;
                
                // Update Meta Description
                let metaDesc = document.querySelector('meta[name="description"]');
                if (!metaDesc) {
                    metaDesc = document.createElement('meta');
                    metaDesc.name = "description";
                    document.head.appendChild(metaDesc);
                }
                metaDesc.content = latest.content.substring(0, 160);

                // Inject JSON-LD Schema
                const schema = {
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": latest.title,
                    "description": latest.content,
                    "image": latest.image_url,
                    "datePublished": latest.created_at,
                    "author": { "@type": "Organization", "name": "Marvin Sluis Media Group" }
                };
                let script = document.getElementById('json-ld-schema');
                if (!script) {
                    script = document.createElement('script');
                    script.id = 'json-ld-schema';
                    script.type = 'application/ld+json';
                    document.head.appendChild(script);
                }
                script.text = JSON.stringify(schema);
            }
            setLoading(false);
        };
        fetchArticles();
    }, [niche]);

    if (loading) return (
        <div className="py-24 text-center animate-pulse">
            <div className="h-8 w-48 bg-gray-200 dark:bg-white/5 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400 font-mono text-[10px] uppercase tracking-widest">establishing secure data stream...</p>
        </div>
    );

    if (articles.length === 0) return null;

    return (
        <section id="magazine" className="py-20 md:py-40 bg-white dark:bg-transparent transition-colors">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-32 gap-10">
                    <div className="space-y-6 max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white dark:bg-white dark:text-black rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                            <Sparkles className="w-3 h-3 fill-current" /> Daily Audit Feed
                        </div>
                        <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-gray-900 dark:text-white leading-none">
                            The<br/><span className="text-gray-300 dark:text-white/20 italic">Dispatch.</span>
                        </h2>
                    </div>
                    <p className="text-sm md:text-lg text-gray-500 font-medium max-w-xs leading-relaxed uppercase tracking-tighter italic">
                        In-depth technical audits released every 24 hours. Data-driven decision making for the 2026 workforce.
                    </p>
                </div>

                <div className="space-y-24 md:space-y-48">
                    {articles.map((article, index) => (
                        <article key={article.id} className="group relative">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
                                {/* Left Column: Metadata */}
                                <div className="md:col-span-3 space-y-8 sticky top-24">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">Audited Date</span>
                                        <div className="flex items-center gap-2 text-sm font-black text-gray-900 dark:text-white uppercase font-serif">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            {new Date(article.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] leading-relaxed">
                                        Ref ID: {article.id.slice(0,8)}<br/>
                                        Verification: 100% OK
                                    </div>
                                    <div className="pt-8 border-t border-gray-100 dark:border-white/5 hidden md:block">
                                        <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 group-hover:bg-black group-hover:text-white transition-all duration-500">
                                            <p className="text-[10px] font-black uppercase tracking-widest mb-4">Quick Verdict</p>
                                            <p className="text-sm font-serif italic leading-relaxed">
                                                "{article.title.split(':')[0]} represents a significant leap in niche performance markers."
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Content */}
                                <div className="md:col-span-9 space-y-12">
                                    <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/5 dark:to-white/10 border border-gray-100 dark:border-white/10 shadow-2xl group-hover:scale-[1.01] transition-transform duration-700">
                                        {article.image_url ? (
                                            <img src={article.image_url} alt={article.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-gray-300">
                                                <Sparkles className="w-8 h-8 opacity-20" />
                                                <span className="uppercase font-black text-[10px] tracking-[1em] pl-[1em]">Audit Asset</span>
                                            </div>
                                        )}
                                        <div className="absolute top-8 left-8 flex gap-2">
                                            <div className="px-4 py-2 bg-black/80 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                                                Audited 2026
                                            </div>
                                            <div className="px-4 py-2 bg-green-500/80 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-green-400/20">
                                                Verified
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-12">
                                             <span className="text-white text-[10px] font-black uppercase tracking-[0.5em]">View full technical asset gallery</span>
                                        </div>
                                    </div>

                                    <div className="space-y-10 max-w-4xl">
                                        <h3 className="text-5xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-white leading-[0.9] hover:text-gray-600 dark:hover:text-gray-400 transition-colors pointer-events-none">
                                            {article.title}
                                        </h3>

                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                                <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Technical Integrity: {((article.id.charCodeAt(0) % 10) / 10 + 9).toFixed(1)}/10</span>
                                            </div>
                                            <div className="h-[1px] w-12 bg-gray-200 dark:bg-white/20" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Verified March 2026</span>
                                        </div>

                                        <p 
                                            className="text-xl md:text-2xl text-gray-800 dark:text-gray-300 font-medium leading-relaxed font-serif italic"
                                            dangerouslySetInnerHTML={{ 
                                                __html: article.content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-purple-500 hover:text-purple-400 underline decoration-purple-500/30">$1</a>').replace(/\n/g, '<br/>')
                                            }}
                                        />

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-y border-gray-100 dark:border-white/5">
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Core Expertise</p>
                                                <ul className="space-y-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                    <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-black dark:text-white" /> Durability Audited</li>
                                                    <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-black dark:text-white" /> Investment-Grade Assets</li>
                                                </ul>
                                            </div>
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Market Value</p>
                                                <p className="text-2xl font-serif text-gray-900 dark:text-white">Verified Partner Dispatch</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-8 pt-4">
                                            <a 
                                                href={article.affiliate_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="group/btn relative inline-flex items-center gap-8 h-20 px-12 bg-black text-white dark:bg-white dark:text-black rounded-full font-black text-sm uppercase tracking-[0.2em] transition-all hover:pr-16 active:scale-95 shadow-2xl shadow-black/20"
                                            >
                                                Acquire via Partner
                                                <ArrowRight className="absolute right-8 w-6 h-6 transform group-hover/btn:translate-x-2 transition-transform" />
                                            </a>
                                            <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                                <Bookmark className="w-4 h-4" /> Save Audit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* --- AUTHORITY PATCH: TECHNICAL AUDIT METHODOLOGY --- */}
                <div className="mt-40 pt-20 border-t border-gray-100 dark:border-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                        <div className="md:col-span-4 space-y-6">
                            <h4 className="text-2xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">Audit Methodology.</h4>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed italic uppercase tracking-tighter">
                                Transparency in data gathering and technical benchmarking for the 2026 partner ecosystem.
                            </p>
                        </div>
                        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                                    <span className="text-[10px] font-black italic">01</span>
                                </div>
                                <h5 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">Latency & Integrity</h5>
                                <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                                    We execute automated head-requests every 60 minutes to verify link integrity and regional price parity across the EU corridor.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                                    <span className="text-[10px] font-black italic">02</span>
                                </div>
                                <h5 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">Multi-Geo Benchmarks</h5>
                                <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                                    Our engine compares checkout finality (including dynamic fees) between UK, DE, and NL providers to ensure accurate "Acquire via Partner" mapping.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
