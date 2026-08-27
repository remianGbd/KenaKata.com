# KenaKata Project Summary

## Project Overview
KenaKata is a full-stack marketplace application with a React frontend built on Vite and an Express backend using PostgreSQL.

The workspace contains two main folders:
- `Backend/` - Express API server and PostgreSQL database connection
- `Frontend/` - React + Vite user interface with routing, components, and service modules

---

## Backend

### Entry point
- `Backend/index.js`
  - Creates an Express app
  - Enables CORS and JSON request parsing
  - Defines a root route at `/`
  - Defines a database test route at `/db-test`
  - Starts server on port `5000`

### Database configuration
- `Backend/database.js`
  - Uses `pg` and `dotenv`
  - Loads environment variables from `.env`
  - Creates a `Pool` with `DB_USER`, `DB_HOST`, `DB_NAME`, `DB_PASSWORD`, and `DB_PORT`

### Dependencies
- `express`
- `cors`
- `dotenv`
- `pg`

### Backend package scripts
- `npm test` - placeholder test script

### Notes
- Backend currently has a simple health route and database connectivity check.
- No additional API endpoints are defined yet.

---

## Frontend

### Core stack
- `React 19`
- `Vite`
- `react-router-dom`
- `ESLint`

### Entry point
- `Frontend/src/main.jsx`
  - Imports `App` and `./styles/global.css`
  - Renders the React app into `#root`

### Main app file
- `Frontend/src/App.jsx`
  - Contains React app structure and commented UI layout
  - Includes navigation, hero section, search section, categories, and product previews

### Pages
- `Frontend/src/pages/`
  - `Cart.jsx`
  - `Checkout.jsx`
  - `Home.jsx`
  - `Login.jsx`
  - `Markets.jsx`
  - `Orders.jsx`
  - `ProductDetails.jsx`
  - `Products.jsx`
  - `Profile.jsx`
  - `Register.jsx`
  - `Reservations.jsx`
  - `Stores.jsx`

### Components
- `Frontend/src/components/`
  - `BookingButton.jsx`
  - `CategoryCard.jsx`
  - `Footer.jsx`
  - `Navbar.css`
  - `Navbar.jsx`
  - `OrderCard.jsx`
  - `ProductCard.jsx`
  - `SearchBar.jsx`
  - `StoreCard.jsx`

### Context providers
- `Frontend/src/context/`
  - `AuthContext.jsx`
  - `CartContext.jsx`

### Service modules
- `Frontend/src/services/`
  - `api.js` (currently empty)
  - `authService.js`
  - `orderService.js`
  - `productService.js`
  - `reservationService.js`
  - `storeService.js`

### Styles
- `Frontend/src/styles/global.css`
- `Frontend/src/styles/responsive.css`
- `Frontend/src/components/Navbar.css`

### Frontend package scripts
- `npm run dev` - starts Vite development server
- `npm run build` - builds production bundle
- `npm run lint` - runs ESLint
- `npm run preview` - serves build locally

---

## How to run

### Backend
1. Open `Backend/`
2. Install dependencies: `npm install`
3. Add `.env` with PostgreSQL credentials:
   - `DB_USER`
   - `DB_HOST`
   - `DB_NAME`
   - `DB_PASSWORD`
   - `DB_PORT`
4. Start server: `node index.js`
5. Backend URL: `http://localhost:5000`

### Frontend
1. Open `Frontend/`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Frontend URL: typically `http://localhost:5173`

---

## Notes / TODO
- Add actual backend API endpoints for products, stores, orders, reservations, auth, and cart operations.
- Implement `Frontend/src/services/api.js` to centralize API calls.
- Complete React page routing and hook up frontend service calls.
- Add `.env` file handling and configuration documentation if needed.
- Add tests for backend and frontend.
