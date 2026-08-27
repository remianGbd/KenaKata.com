import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getMarkets } from '../services/api';
import './Markets.css';

function Markets() {
  const [markets, setMarkets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadMarkets() {
      try {
        const data = await getMarkets();
        setMarkets(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load markets');
      } finally {
        setLoading(false);
      }
    }

    loadMarkets();
  }, []);

  const filteredMarkets = markets.filter(
    (market) =>
      market.market_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      market.location
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="markets-page">
      <Navbar />

      <div className="markets-container">

        <div className="markets-header">
          <h1>Local Markets</h1>
          <p>Discover markets around Dhaka and explore their stores</p>
        </div>

        <div className="markets-toolbar">
          <input
            type="text"
            className="markets-search"
            placeholder="Search markets by name or area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading && <p>Loading markets...</p>}

        {error && <p>{error}</p>}

        <div className="markets-grid">
          {filteredMarkets.map((market) => (
            <Link
              to={`/stores?market=${market.market_id}`}
              key={market.market_id}
              className="market-card"
            >
              <div className="market-card-content">

                <h3>{market.market_name}</h3>

                <p className="market-location">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>

                  {market.location}
                </p>

                <span className="market-cta">
                  View Stores →
                </span>

              </div>
            </Link>
          ))}
        </div>

        {!loading && filteredMarkets.length === 0 && (
          <div className="markets-empty">
            <h3>No markets found</h3>
            <p>Try searching with a different name or area.</p>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}

export default Markets;