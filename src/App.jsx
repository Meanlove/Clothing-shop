import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from './context/WishlistContext';
import Homepage from "./Components/Homepage";
import Men from "./Components/Men";
import Women from "./Components/Women";
import AllCollections from "./Components/AllCollections";
import Contact from "./Components/Contact";
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Cart from "./Components/Cart";
import ProductDetail from "./context/ProductDetail";
import Wishlist from "./Components/Wishlist";

const App = () => {
  return (
    <CartProvider>
      <WishlistProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
              <Route path="/all-collections" element={<AllCollections />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} /> 
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
