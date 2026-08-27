import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Markets from "./pages/Markets";
import Stores from "./pages/Stores";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Reservations from "./pages/Reservations";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admindashboard";
import AddProduct from "./pages/AddProduct";


function PortalStub({ title }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f7f4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #dedfd8",
          borderRadius: 12,
          padding: "48px 56px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            margin: "0 0 8px",
            fontSize: 24,
            color: "#11120f",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            margin: 0,
            color: "#555750",
            fontSize: 14,
          }}
        >
          This portal is under construction — coming in the next phase.
        </p>
      </div>
    </div>
  );
}


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>

          <Routes>

            {/* =========================
                PUBLIC ROUTES
            ========================= */}

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/products/:id"
              element={<ProductDetails />}
            />

            <Route
              path="/markets"
              element={<Markets />}
            />

            <Route
              path="/stores"
              element={<Stores />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />


            {/* =========================
                CUSTOMER PROTECTED ROUTES
            ========================= */}

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reservations"
              element={
                <ProtectedRoute>
                  <Reservations />
                </ProtectedRoute>
              }
            />

            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />


            {/* =========================
                SELLER ROUTE
            ========================= */}

            <Route
              path="/seller/dashboard"
              element={
                <PortalStub title="Seller Portal" />
              }
            />


            {/* =========================
                ADMIN ROUTE
            ========================= */}

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute roles={["ADMIN"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/add-product" element={<AddProduct/>}/>

          </Routes>

        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}


export default App;