import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Men from "./Men";
import Women from "./Women";
import Navbar from "./Navbar";
import About from "./About";
import Contact from "./Contact";
import Homepage from "./Homepage";
import AllCollections from "./AllCollections";
import Cart from "./Cart";
import Login from "./Login";
import Register from "./Register";
import ProductDetail from "../context/ProductDetail";

export default function Connect() {
  return (
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
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
