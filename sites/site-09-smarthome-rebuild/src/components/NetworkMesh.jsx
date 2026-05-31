import React from 'react';

const NetworkMesh = ({ currentNiche = 'Gaming' }) => {
  const hubs = [
    { name: 'SaaS', url: 'https://marvinsluis-media.pages.dev/saas/', icon: '🚀' },
    { name: 'VPN', url: 'https://marvinsluis-media.pages.dev/vpn/', icon: '🛡️' },
    { name: 'AI', url: 'https://marvinsluis-media.pages.dev/aiproductivity/', icon: '🤖' },
    { name: 'Gaming', url: 'https://marvinsluis-media.pages.dev/gaming/', icon: '🎮' },
    { name: 'FinTech', url: 'https://marvinsluis-media.pages.dev/fintech/', icon: '💳' },
    { name: 'Travel', url: 'https://marvinsluis-media.pages.dev/travel/', icon: '🌍' }
  ];

  // Filter out the current niche and take 4 others for the mesh
  const meshHubs = hubs.filter(h => h.name.toLowerCase() !== currentNiche.toLowerCase()).slice(0, 4);

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-10 py-32 border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="space-y-4">
          <h3 className="text-4xl font-black uppercase tracking-tighter">Global Authority Mesh</h3>
          <p className="text-zinc-500 mono text-[10px] uppercase tracking-[0.4em]">Interconnected Shopping Ecosystem v2.0</p>
        </div>
        <div className="max-w-md text-zinc-400 text-sm font-light leading-relaxed">
          Marvin Sluis Media operates 12 specialized technical dispatches. Our global mesh ensures data parity and technical integrity across all market sectors.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {meshHubs.map((hub, i) => (
          <a 
            key={i}
            href={hub.url}
            className="group glass p-8 rounded-[2rem] flex flex-col justify-between hover:bg-white/5 transition-all relative overflow-hidden"
          >
            {/* Background Icon Watermark */}
            <div className="absolute top-0 right-0 text-7xl translate-x-1/2 -translate-y-1/2 opacity-5 scale-150 rotate-12 group-hover:opacity-10 transition-all">
              {hub.icon}
            </div>

            <div className="space-y-4 relative z-10">
              <div className="text-2xl">{hub.icon}</div>
              <h4 className="text-2xl font-black uppercase tracking-tighter">{hub.name}</h4>
            </div>

            <div className="mt-8 flex justify-between items-end relative z-10">
              <span className="mono text-[8px] font-black uppercase tracking-widest text-zinc-600">Audit Status: LIVE</span>
              <span className="p-3 bg-white/5 rounded-full group-hover:bg-blue-500 transition-colors">↗</span>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-20 text-center">
        <p className="mono text-[8px] text-zinc-700 uppercase tracking-[0.5em]">
          &copy; 2026 Marvin van der Sluis Media Group. All Nodes Active.
        </p>
      </div>
    </section>
  );
};

export default NetworkMesh;
