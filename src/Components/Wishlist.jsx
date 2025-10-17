import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaHome, FaTrash, FaStar, FaArrowRight } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist, getWishlistItemsCount, toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name || product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  const handleMoveAllToCart = () => {
    items.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name || item.title,
        price: item.price,
        image: item.image,
        category: item.category,
      });
    });
    clearWishlist();
  };

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

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 pt-20 pb-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-lg p-12">
            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHeart className="text-3xl text-pink-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Start adding your favorite items to your wishlist!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/all-collections"
                className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-700 transition-all duration-300 hover:scale-105"
              >
                Explore Products
              </Link>
              <Link
                to="/"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-pink-500 hover:text-pink-600 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <FaHome />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 pt-20 pb-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {getWishlistItemsCount()} items saved for later
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleMoveAllToCart}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105"
          >
            Move All to Cart
          </button>
          <button
            onClick={clearWishlist}
            className="text-gray-500 hover:text-red-600 transition-colors duration-300 flex items-center gap-2 hover:scale-105"
          >
            <FaTrash />
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-pink-300 block"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name || item.title}
                  className="w-full h-64 object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(item);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                    isInWishlist(item.id)
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
                    <span>{item.rating?.rate?.toFixed(1) || item.rating || 4.5}</span>
                  </div>
                </div>

                {/* Category Badge */}
                <div
                  className={`absolute bottom-3 left-3 bg-gradient-to-r ${getCategoryColor(
                    item.category
                  )} text-white px-2 py-1 rounded-full text-xs font-medium`}
                >
                  {item.category === "men's clothing" ? "Men's" : "Women's"}
                </div>

                {/* Popular Badge */}
                {item.price < 50 && (
                  <div className="absolute top-12 left-3 bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Popular
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-pink-600 transition-colors duration-300">
                  {item.name || item.title}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-pink-600">
                      ${item.price}
                    </span>
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

                {/* View Details Link */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-pink-600 text-sm font-medium group-hover:text-pink-700 transition-colors duration-300">
                    <span>View Details</span>
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;