import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaFilter,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; // ✅ ADD THIS IMPORT
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

const AllCollections = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist(); // ✅ ADD THIS LINE
  const location = useLocation();

  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "All Collections",
      subtitle: "Discover our complete range of premium fashion",
      buttonText: "Start Exploring",
    },
    {
      image:
        "https://i.pinimg.com/1200x/92/22/d3/9222d33e44c600cbce02c285359c5023.jpg",
      title: "Premium Quality",
      subtitle: "Curated selection of the finest clothing items",
      buttonText: "Shop Now",
    },
    {
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Latest Trends",
      subtitle: "Stay ahead with our newest arrivals",
      buttonText: "View New Arrivals",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Read search parameter from URL when component loads or URL changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [location.search]);

  useEffect(() => {
    // Fetch from local JSON file
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((json) => {
        const transformedData = json.products.map((product) => ({
          id: product.id,
          title: product.name,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          rating: {
            rate: product.rating,
            count: Math.floor(Math.random() * 200) + 50,
          },
        }));

        setData(transformedData);
        setFilteredData(transformedData);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Local JSON Error:", err);
        loadLocalData();
      });
  }, []);

  const loadLocalData = () => {
    const localProducts = [
      {
        id: 1,
        title: "Men's Casual Shirt",
        price: 29.99,
        description: "Comfortable casual shirt for everyday wear",
        category: "men's clothing",
        image:
          "https://i.pinimg.com/1200x/9b/60/e2/9b60e28ae765f097871c22bcc14cb6c5.jpg",
        rating: { rate: 4.5, count: 120 },
      },
      {
        id: 2,
        title: "Women's Casual Shirt",
        price: 29.99,
        description: "Comfortable casual shirt for everyday wear",
        category: "women's clothing",
        image:
          "https://i.pinimg.com/1200x/ea/bc/e0/eabce058ed8bf038fd13465ee88652aa.jpg",
        rating: { rate: 4.5, count: 89 },
      },
    ];
    setData(localProducts);
    setFilteredData(localProducts);
    setLoading(false);
  };

  // Filter and sort products
  useEffect(() => {
    let results = [...data];

    // Search filter - IMPROVED
    if (searchTerm) {
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.name &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Price filter
    results = results.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    // Category filter
    if (selectedCategory !== "all") {
      results = results.filter((item) =>
        item.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => b.rating?.rate - a.rating?.rate);
        break;
      case "name":
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredData(results);
  }, [data, sortBy, priceRange, searchTerm, selectedCategory]);

  // Updated categories based on DummyJSON categories
  const categories = [
    { id: "all", name: "All Products", count: data.length },
    {
      id: "men's clothing",
      name: "Men's Fashion",
      count: data.filter((item) => item.category === "men's clothing").length,
    },
    {
      id: "women's clothing",
      name: "Women's Fashion",
      count: data.filter((item) => item.category === "women's clothing").length,
    },
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case "men's clothing":
        return "from-blue-500 to-blue-600";
      case "women's clothing":
        return "from-pink-500 to-rose-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 1000]);
    setSelectedCategory("all");
    setSortBy("default");
  };

  // Function to handle Add to Cart
  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Header Section */}
      <section className="relative h-96 overflow-hidden">
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              All Collections
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover our complete range of premium fashion
            </p>

            <div className="flex gap-4 justify-center items-center">
              <button
                onClick={() =>
                  document
                    .getElementById("products")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-400 hover:scale-105 transform transition-all duration-300 shadow-2xl flex items-center gap-2"
              >
                Explore Collections
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <div id="products" className="py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with Search Results */}
          <div className="text-center mb-8">
            {searchTerm && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Search Results
                </h2>
                <p className="text-gray-600">
                  Found{" "}
                  <span className="font-semibold text-blue-600">
                    {filteredData.length}
                  </span>{" "}
                  products matching "
                  <span className="text-blue-600 font-semibold">
                    {searchTerm}
                  </span>
                  "
                </p>
              </div>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200"
            >
              <FaFilter />
              <span>Filters</span>
            </button>
            <div className="text-sm text-gray-600">
              {filteredData.length} products
            </div>
          </div>

          {/* Filters Bar (WITHOUT SEARCH) */}
          <div
            className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 transition-all duration-300 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="default">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name A-Z</option>
              </select>

              {/* Price Range */}
              {/* <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  Price: ${priceRange[0]} - ${priceRange[1]}
                </span>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-32 accent-blue-600"
                />
              </div> */}

              {/* Reset Filters */}
              <button
                onClick={resetFilters}
                className="px-4 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors duration-300 flex items-center gap-2"
              >
                <FaTimes />
                <span>Reset</span>
              </button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative group ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${getCategoryColor(
                          category.id
                        )} text-white shadow-lg`
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                  <span
                    className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                      selectedCategory === category.id
                        ? "bg-white/20"
                        : "bg-gray-200"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm ||
            selectedCategory !== "all" ||
            priceRange[1] < 1000) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchTerm && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="hover:text-blue-900"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  Category:{" "}
                  {categories.find((c) => c.id === selectedCategory)?.name}
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="hover:text-green-900"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </span>
              )}
              {priceRange[1] < 1000 && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  Price: up to ${priceRange[1]}
                  <button
                    onClick={() => setPriceRange([0, 1000])}
                    className="hover:text-purple-900"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          <div className="max-w-7xl mx-auto">
            {filteredData.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm
                    ? `No products found for "${searchTerm}". Try a different search term.`
                    : "Try adjusting your search or filters"}
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredData.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-blue-300 block"
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(item); // ✅ CHANGE TO THIS
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                          isInWishlist(item.id) // ✅ CHANGE TO THIS
                            ? "bg-red-500 text-white"
                            : "bg-white/80 text-gray-600"
                        } hover:scale-105 active:scale-95`}
                      >
                        <FaHeart className="text-sm" />
                      </button>

                      {/* Rating Badge */}
                      <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span>{item.rating?.rate?.toFixed(1) || 4.5}</span>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div
                        className={`absolute bottom-3 left-3 bg-gradient-to-r ${getCategoryColor(
                          item.category
                        )} text-white px-2 py-1 rounded-full text-xs font-medium`}
                      >
                        {categories.find((c) => c.id === item.category)?.name ||
                          item.category}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {item.title}
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-blue-600">
                            ${item.price}
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                            Free Shipping
                          </span>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(item);
                          }}
                          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                        >
                          <FaShoppingCart className="text-sm" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <footer className="bg-gray-900 text-white">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <img
                  className="w-12 h-12 rounded-full border-2 border-amber-500 object-cover"
                  src="https://i.pinimg.com/1200x/7a/bf/2c/7abf2ca43b62487de9aa4cfc62686e84.jpg"
                  alt="CLOTHING SHOP"
                />
                <span className="font-bold text-3xl bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  CLOTHING SHOP
                </span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-xl">
                Your premier destination for trendy and affordable fashion.
                Discover the latest styles with quality you can trust. We bring
                fashion to your doorstep.
              </p>
              <div className="flex gap-4">
                <NavLink
                  to="/all-collections"
                  className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-300 hover:scale-105"
                >
                  Shop Now
                </NavLink>
                <NavLink
                  to="/about"
                  className="border-2 border-amber-500 text-amber-500 px-6 py-3 rounded-lg font-semibold hover:bg-amber-500 hover:text-white transition-colors duration-300 hover:scale-105"
                >
                  Learn More
                </NavLink>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-amber-400">Shop</h3>
              <div className="space-y-4">
                <NavLink
                  to="/men"
                  className="block text-gray-300 hover:text-amber-400 transition-colors duration-300 text-lg hover:translate-x-2 transform"
                >
                  Men's Collection
                </NavLink>
                <NavLink
                  to="/women"
                  className="block text-gray-300 hover:text-amber-400 transition-colors duration-300 text-lg hover:translate-x-2 transform"
                >
                  Women's Collection
                </NavLink>
                <NavLink
                  to="/all-collections"
                  className="block text-gray-300 hover:text-amber-400 transition-colors duration-300 text-lg hover:translate-x-2 transform"
                >
                  All Products
                </NavLink>
                <NavLink
                  to="/new-arrivals"
                  className="block text-gray-300 hover:text-amber-400 transition-colors duration-300 text-lg hover:translate-x-2 transform"
                >
                  New Arrivals
                </NavLink>
                <NavLink
                  to="/sale"
                  className="block text-gray-300 hover:text-amber-400 transition-colors duration-300 text-lg hover:translate-x-2 transform"
                >
                  Sale Items
                </NavLink>
              </div>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-amber-400">Support</h3>
              <div className="space-y-4">
                <NavLink
                  to="/contact"
                  className="block text-gray-300 hover:text-amber-400 transition-colors duration-300 text-lg"
                >
                  Contact Us
                </NavLink>
                <NavLink
                  to="/shipping"
                  className="block text-gray-300 hover:text-amber-400 transition-colors duration-300 text-lg"
                >
                  Shipping Info
                </NavLink>
                <NavLink
                  to="/returns"
                  className="block text-gray-300 hover:text-amber-400 transition-colors duration-300 text-lg"
                >
                  Returns & Exchange
                </NavLink>
                <NavLink
                  to="/faq"
                  className="block text-gray-300 hover:text-amber-400 transition-colors duration-300 text-lg"
                >
                  FAQ
                </NavLink>
                <NavLink
                  to="/size-guide"
                  className="block text-gray-300 hover:text-amber-400 transition-colors duration-300 text-lg"
                >
                  Size Guide
                </NavLink>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-gray-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">🚚</span>
              </div>
              <h4 className="font-bold text-white text-lg mb-2">
                Free Shipping
              </h4>
              <p className="text-gray-300">On all orders!</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">🔒</span>
              </div>
              <h4 className="font-bold text-white text-lg mb-2">
                Secure Payment
              </h4>
              <p className="text-gray-300">100% protected</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">💎</span>
              </div>
              <h4 className="font-bold text-white text-lg mb-2">
                Quality Products
              </h4>
              <p className="text-gray-300">Premium quality</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">📞</span>
              </div>
              <h4 className="font-bold text-white text-lg mb-2">
                24/7 Support
              </h4>
              <p className="text-gray-300">Always here to help</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 py-6 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                © 2024 CLOTHING SHOP. All rights reserved. Crafted with ❤️ for
                fashion lovers
              </div>
              <div className="flex gap-8 text-gray-400">
                <NavLink
                  to="/privacy"
                  className="hover:text-amber-400 transition-colors duration-300"
                >
                  Privacy Policy
                </NavLink>
                <NavLink
                  to="/terms"
                  className="hover:text-amber-400 transition-colors duration-300"
                >
                  Terms of Service
                </NavLink>
                <NavLink
                  to="/sitemap"
                  className="hover:text-amber-400 transition-colors duration-300"
                >
                  Sitemap
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AllCollections;
