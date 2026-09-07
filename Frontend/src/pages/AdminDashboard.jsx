import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import { getMarkets, createMarket } from '../services/api';
import { getMarkets, createMarket } from '../services/storeService';
import './AdminDashboard.css';

function AdminDashboard() {
  const [markets, setMarkets] = useState([]);
  const [marketName, setMarketName] = useState('');
  const [location, setLocation] = useState('');

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadMarkets() {
      try {
        setLoading(true);
        setError('');

        const data = await getMarkets();

        setMarkets(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load markets.');
      } finally {
        setLoading(false);
      }
    }

    loadMarkets();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSubmitting(true);
      setMessage('');
      setError('');

      const newMarket = await createMarket(
        marketName,
        location
      );

      setMarkets((currentMarkets) => [
        ...currentMarkets,
        newMarket
      ]);

      setMarketName('');
      setLocation('');

      setMessage('Market added successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to add market.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-page">

      <Navbar />

      <main className="admin-container">

        <section className="admin-header">
          <p className="admin-label">
            KenaKata Administration
          </p>

          <h1>Admin Dashboard</h1>

          <p>
            Manage local markets available on the KenaKata platform.
          </p>
        </section>


        <section className="admin-card">

          <div className="admin-card-header">
            <div>
              <h2>Add New Market</h2>
              <p>
                Add a verified local market to the platform.
              </p>
            </div>
          </div>


          <form
            className="admin-form"
            onSubmit={handleSubmit}
          >

            <div className="admin-form-group">
              <label htmlFor="marketName">
                Market Name
              </label>

              <input
                id="marketName"
                type="text"
                placeholder="Example: Jamuna Future Park"
                value={marketName}
                onChange={(e) =>
                  setMarketName(e.target.value)
                }
                required
              />
            </div>


            <div className="admin-form-group">
              <label htmlFor="location">
                Location
              </label>

              <input
                id="location"
                type="text"
                placeholder="Example: Bashundhara, Dhaka"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                required
              />
            </div>


            <button
              className="admin-submit-button"
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? 'Adding Market...'
                : 'Add Market'}
            </button>

          </form>


          {message && (
            <div className="admin-message success">
              {message}
            </div>
          )}

          {error && (
            <div className="admin-message error">
              {error}
            </div>
          )}

        </section>


        <section className="admin-card">

          <div className="admin-card-header">
            <div>
              <h2>Existing Markets</h2>

              <p>
                Markets currently stored in the KenaKata database.
              </p>
            </div>

            <span className="admin-count">
              {markets.length} Markets
            </span>
          </div>


          {loading ? (

            <div className="admin-status">
              Loading markets...
            </div>

          ) : markets.length === 0 ? (

            <div className="admin-status">
              No markets have been added yet.
            </div>

          ) : (

            <div className="admin-market-list">

              {markets.map((market) => (

                <div
                  key={market.market_id}
                  className="admin-market-item"
                >

                  <div className="admin-market-icon">
                    M
                  </div>

                  <div className="admin-market-info">
                    <h3>
                      {market.market_name}
                    </h3>

                    <p>
                      {market.location}
                    </p>
                  </div>

                  <div className="admin-market-id">
                    ID: {market.market_id}
                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

      <Footer />

    </div>
  );
}

export default AdminDashboard;