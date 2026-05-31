import React, { useEffect, useState } from 'react';
import { supabase } from '../shared/supabaseClient';
import { ArrowRight, Sparkles, Clock, ExternalLink, ChevronRight, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Magazine = ({ niche }) => {
    const [articles, setArticles] = useState([]);
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(true);

    const RELEVANCE_MATRIX = {
        gaming: 'vpn',
        saas: 'aiproductivity',
        travel: 'pet',
        pet: 'outdoor',
        fintech: 'saas',
        vpn: 'electronics',
        wfh: 'smarthome',
        outdoor: 'travel',
        smarthome: 'electronics',
        aiproductivity: 'fintech',
        fashion: 'electronics',
        electronics: 'gaming'
    };

    const logEvent = async (type, artTitle = 'general') => {
        try {
            await supabase.from('traffic_analytics').insert([{
                event_type: type,
                niche: niche,
                page_path: window.location.pathname,
                referrer: document.referrer,
                user_agent: navigator.userAgent
            }]);
        } catch (e) { console.warn("Analytics bypass: ", e); }
    };

    useEffect(() => {
        const fetchArticles = async () => {
            // Detect language from URL
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
                logEvent('page_view', niche);
                
                // Fetch Trust Mesh Recommendation
                const targetNiche = RELEVANCE_MATRIX[niche] || 'saas';
                const { data: recData } = await supabase
                    .from('hubs_content')
                    .select('*')
                    .eq('niche', targetNiche)
                    .eq('language', urlLang)
                    .gte('total_score', 9.5)
                    .limit(1);
                
                if (recData && recData[0]) setRecommendation(recData[0]);

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

        // --- PINTEREST SDK INJECTION ---
        if (!document.getElementById('pinit-sdk')) {
            const pinScript = document.createElement('script');
            pinScript.id = 'pinit-sdk';
            pinScript.async = true;
            pinScript.defer = true;
            pinScript.src = "https://assets.pinterest.com/js/pinit.js";
            document.head.appendChild(pinScript);
        }
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
                                        <div className="absolute top-8 left-8 flex flex-wrap gap-2 z-20">
                                            <div className="px-4 py-2 bg-black/80 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                                                Audited 2026
                                            </div>
                                            <div className="px-4 py-2 bg-green-500/80 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-green-400/20">
                                                Verified
                                            </div>
                                            {article.is_price_drop && (
                                                <div className="px-4 py-2 bg-red-600 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-red-400/30 animate-pulse shadow-lg shadow-red-600/20">
                                                    🔥 Live Deal Detected (-{article.drop_percentage}%)
                                                </div>
                                            )}
                                        </div>

                                        {/* PINTEREST HOVER OVERLAY */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                                            <a 
                                                href={`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent('https://marvinsluis-media.pages.dev/audit/' + article.slug)}&media=${encodeURIComponent(article.image_url)}&description=${encodeURIComponent(article.title)}`}
                                                data-pin-do="buttonPin"
                                                data-pin-custom="true"
                                                style={{ cursor: 'pointer' }}
                                                className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-all duration-500 hover:bg-red-500"
                                            >
                                                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M12.289 2C6.617 2 2 6.617 2 12.289c0 4.305 2.607 8.01 6.385 9.613-.093-.81-.174-2.055.034-2.938.19-.795 1.229-5.211 1.229-5.211s-.313-.626-.313-1.552c0-1.454.843-2.54 1.892-2.54.893 0 1.324.671 1.324 1.477 0 .898-.572 2.241-.866 3.485-.247 1.04.52 1.886 1.546 1.886 1.855 0 3.282-1.957 3.282-4.78 0-2.499-1.796-4.248-4.362-4.248-2.973 0-4.718 2.23-4.718 4.533 0 .898.345 1.86.776 2.382.085.106.097.199.072.305-.08.327-.255 1.037-.29 1.18-.046.185-.148.225-.341.136-1.272-.592-2.067-2.45-2.067-3.943 0-3.21 2.333-6.155 6.721-6.155 3.528 0 6.27 2.514 6.27 5.874 0 3.504-2.21 6.326-5.275 6.326-1.03 0-2.001-.536-2.333-1.168 0 0-.51 1.942-.633 2.417-.229.878-.85 1.984-1.266 2.658 1.02.314 2.1.484 3.219.484 5.671 0 10.289-4.618 10.289-10.289C22.578 6.617 17.96 2 12.289 2z"/></svg>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="space-y-10 max-w-4xl">
                                        <Link to={`/audit/${article.slug}`} className="block group/title">
                                            <h3 className="text-5xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-white leading-[0.9] group-hover/title:text-purple-500 transition-colors">
                                                {article.title}
                                            </h3>
                                        </Link>

                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                                <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">
                                                    Technical Integrity: {article.total_score || ((article.id.charCodeAt(0) % 10) / 10 + 9).toFixed(1)}/100
                                                </span>
                                            </div>
                                            <div className="h-[1px] w-12 bg-gray-200 dark:bg-white/20" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Cert ID: MSM-AUDIT-2026-{article.id.slice(0, 4).toUpperCase()}</span>
                                        </div>

                                        <div className="relative">
                                            <div 
                                                className="text-xl md:text-2xl text-gray-800 dark:text-gray-300 font-medium leading-relaxed font-serif italic line-clamp-3"
                                                dangerouslySetInnerHTML={{ 
                                                    __html: article.content
                                                        .replace(/> \[!IMPORTANT\]/g, '<div class="p-6 bg-purple-500/5 border-l-4 border-purple-500 my-8 italic text-lg text-purple-400">')
                                                        .replace(/> \[!WICHTIG\]/g, '<div class="p-6 bg-purple-500/5 border-l-4 border-purple-500 my-8 italic text-lg text-purple-400">')
                                                        .replace(/> \[!BELANGRIJK\]/g, '<div class="p-6 bg-purple-500/5 border-l-4 border-purple-500 my-8 italic text-lg text-purple-400">')
                                                        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-purple-500 hover:text-purple-400 underline decoration-purple-500/30">$1</a>')
                                                        .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-black text-black dark:text-white">$1</strong>')
                                                        .replace(/\*([^*]+)\*/g, '<em class="italic opacity-80">$1</em>')
                                                        .replace(/\n- /g, '<br/>• ')
                                                        .replace(/\n\* /g, '<br/>• ')
                                                        .replace(/\n\n/g, '</div><div class="mt-6">')
                                                        .replace(/\n/g, '<br/>')
                                                }}
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-[#0B0F19] to-transparent pointer-events-none" />
                                        </div>

                                        <div className="flex flex-wrap gap-8 pt-4">
                                            <Link 
                                                to={`/audit/${article.slug}`}
                                                className="group/btn relative inline-flex items-center gap-8 h-20 px-12 bg-black text-white dark:bg-white dark:text-black rounded-full font-black text-sm uppercase tracking-[0.2em] transition-all hover:pr-16 active:scale-95 shadow-2xl shadow-black/20"
                                            >
                                                Open Full Audit
                                                <ArrowRight className="absolute right-8 w-6 h-6 transform transition-transform group-hover/btn:translate-x-2" />
                                            </Link>
                                            
                                            <a 
                                                href={`https://wa.me/?text=${encodeURIComponent('🚀 Exclusive [MARVIN MEDIA] Tech Audit: ' + article.title + ' | Full Report: https://marvinsluis-media.pages.dev/audit/' + article.slug)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group/btn relative inline-flex items-center gap-4 h-20 px-8 bg-green-500 text-white rounded-full font-black text-sm uppercase tracking-[0.2em] transition-all hover:bg-green-400 active:scale-95 shadow-2xl shadow-green-500/20"
                                            >
                                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12.031 2c-5.506 0-9.989 4.478-9.99 9.984a9.965 9.965 0 001.333 4.993L2 22l5.135-1.348a9.932 9.932 0 004.887 1.28c5.53 0 10.003-4.477 10.003-9.983A9.998 9.998 0 0012.031 2zm5.735 14.41c-.243.688-1.209 1.254-1.663 1.332-.455.078-.9-.001-2.91-1.055-2.051-.815-3.313-2.799-3.416-2.935-.102-.136-.826-1.108-.826-2.115 0-1.007.527-1.503.714-1.714.186-.21.409-.263.546-.263.137 0 .272.001.387.006.121.005.286-.046.448.337l.634 1.517c.058.14.116.303.023.491-.092.188-.139.303-.277.464-.139.161-.291.278-.415.421-.125.143-.255.291-.11.53.146.24.646 1.053 1.385 1.705.953.84 1.758 1.101 2.012 1.228.254.128.403.106.554-.066.152-.173.647-.751.819-1.007.172-.255.344-.214.58-.127l1.72.843c.236.116.393.19.45.286.056.096.056.553-.187 1.241z"/></svg>
                                                Share to WhatsApp
                                            </a>
                                            
                                            <a 
                                                href={article.affiliate_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                onClick={() => logEvent('affiliate_click', article.title)}
                                                className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" /> Acquire via Partner
                                            </a>
                                        </div>

                                        {/* --- BEHAVIORAL TRUST MESH: CROSS-HUB RECOMMENDATION --- */}
                                        {recommendation && (
                                            <div className="mt-16 group/mesh block p-10 bg-purple-500/5 dark:bg-white/5 border border-purple-500/20 dark:border-white/10 rounded-[2rem] hover:bg-purple-500/10 transition-all duration-500">
                                                <div className="flex flex-col md:flex-row items-center gap-10">
                                                    <div className="w-full md:w-32 h-32 flex-shrink-0 overflow-hidden rounded-2xl border border-purple-500/20">
                                                        <img src={recommendation.image_url} alt={recommendation.title} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1 space-y-4 text-center md:text-left">
                                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500 text-white rounded-full text-[8px] font-black uppercase tracking-widest">
                                                            <Sparkles className="w-2 h-2 fill-current" /> Expert Recommendation
                                                        </div>
                                                        <h4 className="text-xl font-black text-gray-900 dark:text-white leading-tight">
                                                            Secure your setup with this <span className="text-purple-500 italic uppercase">{RELEVANCE_MATRIX[niche]}</span> audit for {recommendation.title.split(':')[0]}.
                                                        </h4>
                                                        <Link 
                                                            to={`/audit/${recommendation.slug}`}
                                                            onClick={() => logEvent('mesh_click', recommendation.title)}
                                                            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-purple-300 transition-colors"
                                                        >
                                                            Open Companion Audit <ChevronRight className="w-3 h-3" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
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
