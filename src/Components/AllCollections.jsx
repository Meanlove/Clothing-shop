import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom"; // បន្ថែម import នេះ

const AllCollections = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [wishlist, setWishlist] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch from local JSON file
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((json) => {
        // Transform the data to match our structure
        const transformedData = json.products.map((product) => ({
          id: product.id,
          title: product.name,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          rating: {
            rate: product.rating,
            count: Math.floor(Math.random() * 200) + 50, // Random count for demo
          },
        }));

        setData(transformedData);
        setFilteredData(transformedData);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Local JSON Error:", err);
        // Fallback to local data if JSON fails
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

    // Search filter
    if (searchTerm) {
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
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

  const toggleWishlist = (id) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(id)) {
      newWishlist.delete(id);
    } else {
      newWishlist.add(id);
    }
    setWishlist(newWishlist);
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading all collections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-10 px-4 sm:px-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            All Collections
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover {data.length}+ premium products across all categories
          </p>
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

        {/* Filters and Search Bar */}
        <div
          className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 transition-all duration-300 ${
            showFilters ? "block" : "hidden lg:block"
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search across all collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

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
            <div className="flex items-center gap-4">
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
            </div>

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
        {(searchTerm || selectedCategory !== "all" || priceRange[1] < 1000) && (
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
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredData.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filters
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
                      toggleWishlist(item.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                      wishlist.has(item.id)
                        ? "bg-red-500 text-white"
                        : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
                    }`}
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
                      {/* Change from item.price > 50 to always show free shipping */}
                      <span className=" px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
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

      {/* Load More Section */}
      {filteredData.length > 0 && (
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 hover:shadow-lg">
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default AllCollections;
