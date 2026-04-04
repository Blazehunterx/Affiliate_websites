import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuditDetail from './components/AuditDetail';

function MainDashboard({ filter, setFilter, loading, games, niche }) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <section className="text-center mb-20 relative overflow-hidden py-20 rounded-[3rem] bg-gradient-to-b from-purple-900/10 to-transparent border border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">TRACK PRICES.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">WIN THE GAME.</span></h1>
        <p className="max-w-xl mx-auto text-gray-400 text-lg">Multi-store comparison for 2026. Comparing Kinguin, Awin & Amazon instantly.</p>
      </section>

      <BentoGrid>
        <BentoCard title="Live Market Pulse" subtitle="Price trends for top trending titles" variant="featured">
           <div className="h-[200px] w-full mt-4">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={mockChartData}><Line type="monotone" dataKey="price" stroke="#A855F7" strokeWidth={3} dot={{ r: 4, fill: '#A855F7' }} activeDot={{ r: 6 }} /><XAxis dataKey="day" hide /><YAxis hide domain={['dataMin - 5', 'dataMax + 5']} /><Tooltip contentStyle={{ backgroundColor: '#151B28', border: '1px solid #1F2937', borderRadius: '12px' }} itemStyle={{ color: '#fff', fontSize: '12px' }} /></LineChart>
             </ResponsiveContainer>
           </div>
           <div className="flex gap-4 mt-6">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-bold"><TrendingUp className="w-3 h-3" /> MARKET STABLE</div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-xs font-bold"><Zap className="w-3 h-3" /> 12 NEW DROPS</div>
           </div>
        </BentoCard>
        <BentoCard title="Verified Stores" subtitle="Top safety index" variant="stat">
            <div className="text-center"><Award className="w-12 h-12 text-purple-500 mx-auto mb-4" /><div className="text-4xl font-black text-white">100%</div></div>
        </BentoCard>
      </BentoGrid>

      <section id="deals" className="mt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white"><Zap className="text-purple-500" /> TOP DEALS TODAY</h2>
          <div className="flex gap-2">
            <button onClick={() => setFilter('official')} className={`px-4 py-2 border rounded-lg text-xs font-bold transition-all ${filter === 'official' ? 'bg-purple-600 border-purple-600 text-white' : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'}`}>Official Only</button>
            <button onClick={() => setFilter('all')} className={`px-4 py-2 border rounded-lg text-xs font-bold transition-all ${filter === 'all' ? 'bg-purple-600 border-purple-600 text-white' : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'}`}>Show All</button>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
             {[1,2,3].map(i => <div key={i} className="h-64 bg-white/5 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.filter(game => filter === 'all' || (filter === 'official' && game.trust >= 9.8)).map(game => (<PriceCard key={game.id} game={game} />))}
          </div>
        )}
      </section>

      <Magazine niche={niche} />
    </main>
  );
}

function App() {
  const niche = "pet";
  const [filter, setFilter] = React.useState('all');
  const [games, setGames] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDeals = async () => {
      const { data, error } = await supabase
        .from('gaming_deals')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) setGames(data);
      setLoading(false);
    };
    fetchDeals();
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-[#0B0F19] min-h-screen font-sans selection:bg-purple-500/30">
        <Routes>
          <Route path="/" element={
            <>
              <SharedHeader />
              <MainDashboard filter={filter} setFilter={setFilter} loading={loading} games={games} niche={niche} />
              <ComplianceFooter />
              <Footer />
            </>
          } />
          <Route path="/audit/:slug" element={<AuditDetail niche={niche} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


