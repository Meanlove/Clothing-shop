import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaStar, FaShippingFast, FaShieldAlt, FaHeadset } from "react-icons/fa";

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "New Collection 2025",
      subtitle: "Discover the latest trends in fashion",
      buttonText: "Explore Now"
    },
    {
      image: "https://i.pinimg.com/1200x/b2/de/7a/b2de7a76b7037ee02ba7394cfb874849.jpg",
      title: "Summer Sale",
      subtitle: "Up to 50% off on selected items",
      buttonText: "Shop Sale"
    },
    {
      image: "https://i.pinimg.com/1200x/92/22/d3/9222d33e44c600cbce02c285359c5023.jpg",
      title: "Premium Quality",
      subtitle: "Crafted with excellence for everyday comfort",
      buttonText: "Discover"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <FaShippingFast className="text-2xl" />,
      title: "Free Shipping",
      description: "On orders over $50"
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Secure Payment",
      description: "100% protected payments"
    },
    {
      icon: <FaHeadset className="text-2xl" />,
      title: "24/7 Support",
      description: "Dedicated customer care"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden pt-16">
        {/* Background Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              {heroSlides[currentSlide].subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/men"
                className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-400 hover:scale-105 transform transition-all duration-300 shadow-2xl flex items-center gap-2"
              >
                Shop Men's Collection
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/women"
                className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 hover:scale-105 transform transition-all duration-300 backdrop-blur-sm"
              >
                Shop Women's Collection
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-gray-300 text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-gray-300 text-sm">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-gray-300 text-sm">Brand Partners</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience with premium quality and excellent service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop By Category</h2>
            <p className="text-lg text-gray-600">Discover our curated collections</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Men's Category */}
            <Link
              to="/men"
              className="group relative h-96 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img
                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Men's Collection"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-3xl font-bold mb-2">Men's Collection</h3>
                <p className="text-lg opacity-90 mb-4">Modern styles for the contemporary man</p>
                <span className="inline-flex items-center gap-2 text-lg font-semibold group-hover:gap-4 transition-all duration-300">
                  Explore Now <FaArrowRight />
                </span>
              </div>
            </Link>

            {/* Women's Category */}
            <Link
              to="/women"
              className="group relative h-96 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Women's Collection"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-3xl font-bold mb-2">Women's Collection</h3>
                <p className="text-lg opacity-90 mb-4">Elegant fashion for every occasion</p>
                <span className="inline-flex items-center gap-2 text-lg font-semibold group-hover:gap-4 transition-all duration-300">
                  Explore Now <FaArrowRight />
                </span>
              </div>
            </Link>
          </div>

          {/* All Collections Link */}
          <div className="text-center mt-12">
            <Link
              to="/all-collections"
              className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-600 hover:scale-105 transform transition-all duration-300 shadow-lg"
            >
              View All Collections
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="relative">
              <img
                className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover group-hover:border-amber-500 transition-colors duration-300"
                src="https://i.pinimg.com/1200x/7a/bf/2c/7abf2ca43b62487de9aa4cfc62686e84.jpg"
                alt="Fashion Store Logo"
              />
              <div className="absolute inset-0 rounded-full bg-amber-500/20 group-hover:bg-amber-500/30 transition-colors duration-300"></div>
            </div>
              <span className="text-xl font-bold">CLOTHING SHOP</span>
            </div>
            <div className="flex gap-6">
              <Link to="/about" className="hover:text-amber-400 transition-colors duration-300">About</Link>
              <Link to="/contact" className="hover:text-amber-400 transition-colors duration-300">Contact</Link>
              <Link to="/privacy" className="hover:text-amber-400 transition-colors duration-300">Privacy</Link>
              <Link to="/terms" className="hover:text-amber-400 transition-colors duration-300">Terms</Link>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-400">
              © 2025 Clothing shop. All rights reserved. Crafted with ❤️ for clothing lovers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;