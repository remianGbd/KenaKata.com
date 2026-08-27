import "./Home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const featuredMarket = {
  name: "Urban Collection",
  location: "Dhaka, Bangladesh",
  distance: "2.4 km",
  stores: 12,
  products: 240
};

const platformStats = {
  stores: "500+",
  products: "10K+",
  markets: "20+"
};

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <p className="hero-eyebrow">
              YOUR LOCAL MARKETPLACE
            </p>

            <h1 className="hero-title">
              Everything you
              <br />
              need.
              <span>Right around you.</span>
            </h1>

            <p className="hero-description">
              Discover products, local stores and markets around your area —
              all in one beautifully simple marketplace.
            </p>

            <div className="hero-buttons">
              <a href="/products" className="primary-button">
                Explore Products
                <span>↗</span>
              </a>

              <a href="/markets" className="secondary-button">
                Discover Markets
              </a>
            </div>
          </div>

          <div className="market-card">
            <div className="market-image-container">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85"
                alt={featuredMarket.name}
                className="market-image"
              />
            </div>

            <div className="market-details">
              <div className="market-main-info">
                <p className="market-label">
                  FEATURED MARKET
                </p>

                <h2 className="market-name">
                  {featuredMarket.name}
                </h2>

                <p className="market-location">
                  {featuredMarket.location}
                </p>
              </div>

              <div className="market-meta">
                <div className="market-store-count">
                  <strong>{featuredMarket.stores}</strong>
                  <span>Stores</span>
                </div>

                <div className="market-distance">
                  <span>{featuredMarket.distance}</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <strong>{platformStats.stores}</strong>
              <span>Local Stores</span>
            </div>

            <div className="stat-card">
              <strong>{platformStats.products}</strong>
              <span>Products</span>
            </div>

            <div className="stat-card">
              <strong>{platformStats.markets}</strong>
              <span>Markets</span>
            </div>

            <div className="stat-card">
              <strong>Dhaka</strong>
              <span>Currently exploring</span>
            </div>
          </div>
        </section>

        <section className="categories-section">
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">
                EXPLORE
              </p>

              <h2>
                Shop by category
              </h2>
            </div>

            <a href="/products" className="view-all">
              View all ↗
            </a>
          </div>

          <div className="category-grid">
            <a href="/products?category=grocery" className="category-card">
              <div className="category-icon grocery-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>

              <div>
                <h3>Fresh Grocery</h3>
                <p>120+ stores</p>
              </div>
            </a>

            <a href="/products?category=fashion" className="category-card">
              <div className="category-icon fashion-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
                </svg>
              </div>

              <div>
                <h3>Fashion</h3>
                <p>80+ stores</p>
              </div>
            </a>

            <a href="/products?category=electronics" className="category-card">
              <div className="category-icon electronics-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>

              <div>
                <h3>Electronics</h3>
                <p>60+ stores</p>
              </div>
            </a>

            <a href="/products?category=home" className="category-card">
              <div className="category-icon home-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>

              <div>
                <h3>Home & Living</h3>
                <p>90+ stores</p>
              </div>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;