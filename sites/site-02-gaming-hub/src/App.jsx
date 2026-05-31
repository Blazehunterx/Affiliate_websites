import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuditDetail from './components/AuditDetail';
import MarvinIntentEngine from './components/MarvinIntentEngine';
import NetworkMesh from './components/NetworkMesh';

function MainDashboard({ filter, setFilter, loading, games, niche, primaryColor }) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <section className="text-center mb-20 relative overflow-hidden py-20 rounded-[3rem] bg-gradient-to-b from-red-900/10 to-transparent border border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight uppercase">Track Prices.<br/><span style={{ color: primaryColor }}>Win the Game.</span></h1>
        <p className="max-w-xl mx-auto text-gray-400 text-lg">Multi-store comparison for 2026. Comparing Kinguin, Awin & Amazon instantly.</p>
      </section>

      {/* ... rest of the dashboard components ... */}
      <Magazine niche={niche} />
      <NetworkMesh currentNiche={niche} />
    </main>
  );
}

function App() {
  const niche = "Gaming";
  const primaryColor = "#ef4444"; // Crimson Red for Gaming
  const [filter, setFilter] = React.useState('all');
  const [games, setGames] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // ... fetch logic ...
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-[#0B0F19] min-h-screen font-sans selection:bg-red-500/30">
        <MarvinIntentEngine primaryColor={primaryColor} niche={niche} />
        <Routes>
          <Route path="/" element={
            <>
              <SharedHeader />
              <MainDashboard 
                filter={filter} 
                setFilter={setFilter} 
                loading={loading} 
                games={games} 
                niche={niche} 
                primaryColor={primaryColor}
              />
              <ComplianceFooter />
              <Footer />
            </>
          } />
          <Route path="/audit/:slug" element={<AuditDetail niche={niche} primaryColor={primaryColor} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

