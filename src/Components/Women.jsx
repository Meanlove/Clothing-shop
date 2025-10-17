import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Women = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch from local JSON instead of API
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((json) => {
        const womenProducts = json.products.filter(
          (product) => product.category === "women's clothing"
        );
        setData(womenProducts);
        setFilteredData(womenProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  // Filter and sort products
  useEffect(() => {
    let results = [...data];

    // Search filter
    if (searchTerm) {
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    results = results.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    // Category filter (simulated since API doesn't have categories)
    if (selectedCategory !== "all") {
      results = results.filter((item) =>
        item.title.toLowerCase().includes(selectedCategory)
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

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    // Remove alert if exists
  };

  const categories = [
    { id: "all", name: "All Products" },
    { id: "dress", name: "Dresses" },
    { id: "top", name: "Tops" },
    { id: "jacket", name: "Jackets" },
    { id: "accessories", name: "Accessories" },
  ];

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center pt-20">
  //       <div className="text-center">
  //         <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
  //         <p className="text-gray-600 text-lg">Loading women's fashion...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 pt-20 pb-10 px-4 sm:px-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Women's Collection
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover elegant fashion that celebrates femininity and style
          </p>
        </div>

        {/* Filters and Search Bar */}

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-pink-600">
              {filteredData.length}
            </span>{" "}
            products
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaFilter />
            <span>Filters Applied</span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredData.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💫</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setPriceRange([0, 500]);
                setSelectedCategory("all");
                setSortBy("default");
              }}
              className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-pink-300 block"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-contain p-4 group-hover:scale-110 transition-transform duration-500"
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
                        ? "bg-rose-500 text-white"
                        : "bg-white/80 text-gray-600 hover:bg-rose-500 hover:text-white"
                    }`}
                  >
                    <FaHeart className="text-sm" />
                  </button>

                  {/* Rating Badge */}
                  <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span>{item.rating?.rate || 4.5}</span>
                    </div>
                  </div>

                  {/* Sale Badge */}
                  {item.price < 50 && (
                    <div className="absolute top-12 left-3 bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Popular
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="font-semibold text-gray-800 line-clamp-2 mb-3 group-hover:text-pink-600 transition-colors duration-300">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-pink-600">
                        ${item.price}
                      </span>
                      {/* Free Shipping Badge - aligned to the left under price */}
                      <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full w-fit mt-1">
                        Free Shipping
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(item, e)}
                      className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
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

      {/* Newsletter Section */}
      <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-2">Stay in Style</h3>
        <p className="mb-6 opacity-90">
          Get the latest women's fashion updates and exclusive offers
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="px-6 py-3 bg-white text-pink-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Women;
