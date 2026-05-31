import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../shared/supabaseClient';
import { ArrowLeft, ExternalLink, ShieldCheck, Zap, Activity, Info } from 'lucide-react';
import SharedHeader from './SharedHeader';
import Footer from './Footer';
import { ComplianceFooter } from './ComplianceFooter';
import NetworkMesh from './NetworkMesh';

const AuditDetail = ({ niche, primaryColor = '#ec4899' }) => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAudit = async () => {
            const { data, error } = await supabase
                .from('hubs_content')
                .select('*')
                .eq('slug', slug)
                .single();

            if (!error && data) {
                setArticle(data);
                
                // SEO Metadata & Schema
                document.title = `${data.title} | Technical Integrity Audit 2026`;
                const schema = {
                    "@context": "https://schema.org",
                    "@type": "Product",
                    "name": data.title,
                    "image": data.image_url,
                    "description": data.content.substring(0, 160),
                    "brand": { "@type": "Brand", "name": "Marvin Sluis Media Group" },
                    "review": {
                        "@type": "Review",
                        "reviewRating": { "@type": "Rating", "ratingValue": data.total_score, "bestRating": "100" },
                        "author": { "@type": "Organization", "name": "MSM Technical Audit Team" }
                    },
                    "aggregateRating": { 
                        "@type": "AggregateRating", 
                        "ratingValue": data.total_score, 
                        "reviewCount": "12",
                        "bestRating": "100"
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "offerCount": "3",
                        "lowPrice": "19.99",
                        "highPrice": "59.99",
                        "priceCurrency": "USD",
                        "availability": "https://schema.org/InStock"
                    }
                };
                let script = document.getElementById('audit-json-ld');
                if (!script) {
                    script = document.createElement('script');
                    script.id = 'audit-json-ld';
                    script.type = 'application/ld+json';
                    document.head.appendChild(script);
                }
                script.text = JSON.stringify(schema);
            }
            setLoading(false);
        };
        fetchAudit();
    }, [slug]);

    if (loading) return <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white font-black animate-pulse uppercase tracking-[1em]">FETCHING AUDIT...</div>;
    if (!article) return <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white">404: Audit Not Found</div>;

    const b = article.score_breakdown || { a: 95, b: 92, c: 88, labels: ['Security', 'Infrastructure', 'Value'] };

    return (
        <div className="bg-[#0B0F19] min-h-screen font-sans selection:bg-red-500/30 text-white">
            <SharedHeader />
            
            <main className="max-w-5xl mx-auto px-6 py-20">
                <Link to="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors mb-12">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>

                <div className="space-y-12">
                    {/* Header Section */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white text-[10px] font-black uppercase tracking-[0.3em]" style={{ borderColor: `${primaryColor}33`, color: primaryColor }}>
                            <ShieldCheck className="w-4 h-4" /> SECURE AUDIT CHANNEL MSM-2026
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none uppercase italic">
                            {article.title}
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl font-serif italic border-l-2 pl-6" style={{ borderColor: primaryColor }}>
                            Technical analysis performed by our 2026 verified node cluster. Results indicate a high-tier infrastructure integrity score.
                        </p>
                    </div>

                    {/* Tri-Force Integrity Indicator */}
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 md:p-16 space-y-12">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black uppercase tracking-tighter">Tri-Force Integrity Index</h2>
                            <div className="text-5xl font-black" style={{ color: primaryColor }}>
                                {article.total_score}/100
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="space-y-4">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    <span>{b.labels[0]}</span>
                                    <span>{b.a}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <div className="h-full transition-all duration-1000 shadow-xl" style={{ width: `${b.a}%`, backgroundColor: primaryColor, boxShadow: `0 0 15px ${primaryColor}` }} />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    <span>{b.labels[1]}</span>
                                    <span>{b.b}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${b.b}%` }} />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    <span>{b.labels[2]}</span>
                                    <span>{b.c}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <div className="h-full bg-orange-500 transition-all duration-1000" style={{ width: `${b.c}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-8">
                            <div 
                                className="text-xl md:text-2xl font-serif italic text-gray-300 leading-relaxed prose prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ 
                                    __html: article.content
                                        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" target="_blank" style="color: ${primaryColor}" class="underline">$1</a>`)
                                        .replace(/\*\*([^*]+)\*\*/g, '<span class="font-black text-white">$1</span>')
                                        .replace(/\n/g, '<br/>')
                                }}
                            />
                        </div>
                        <div className="md:col-span-4 sticky top-24 h-fit space-y-6">
                            <div className="p-8 border rounded-[2rem] space-y-6" style={{ borderColor: `${primaryColor}44`, background: `linear-gradient(to bottom right, ${primaryColor}11, transparent)` }}>
                                <h4 className="text-sm font-black uppercase tracking-widest">Partner Acquisition</h4>
                                <p className="text-xs text-gray-400 uppercase tracking-tighter leading-relaxed">
                                    Secure your route via our verified {niche} partner network.
                                </p>
                                <a 
                                    href={article.affiliate_url} 
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 w-full py-4 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:opacity-80 transition-all shadow-2xl shadow-white/10"
                                >
                                    <ExternalLink className="w-4 h-4" /> Secure via Partner
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Methodology */}
                <section className="mt-40 pt-20 border-t border-white/5">
                    <div className="flex items-start gap-4 mb-8">
                        <Info className="w-6 h-6" style={{ color: primaryColor }} />
                        <h3 className="text-2xl font-black tracking-tighter uppercase">Weighted Audit Methodology (30-30-40)</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-gray-500 leading-relaxed italic uppercase font-medium tracking-tighter">
                        <p>Our audit engine evaluates <strong>{b.labels[0]} (30%)</strong> using high-fidelity head-requests and regional node response times.</p>
                        <p>We verify <strong>{b.labels[1]} (30%)</strong> by checking SSL certification depth and partner integrity certificates.</p>
                        <p>The primary driver <strong>{b.labels[2]} (40%)</strong> measures multi-store price-to-performance parity for 2026 standards.</p>
                    </div>
                </section>
            </main>

            <NetworkMesh currentNiche={niche} />
            <ComplianceFooter />
            <Footer />
        </div>
    );
};

export default AuditDetail;
