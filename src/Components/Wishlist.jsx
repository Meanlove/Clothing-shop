import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaHome, FaTrash } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist, getWishlistItemsCount } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
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
                className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-700 transition-all duration-300"
              >
                Explore Products
              </Link>
              <Link
                to="/"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-pink-500 hover:text-pink-600 transition-all duration-300"
              >
                <FaHome className="inline mr-2" />
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
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300"
          >
            Move All to Cart
          </button>
          <button
            onClick={clearWishlist}
            className="text-gray-500 hover:text-red-600 transition-colors duration-300 flex items-center gap-2"
          >
            <FaTrash />
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name || item.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 p-2 bg-white/80 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <FaHeart className="text-sm" />
                </button>
              </div>

              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                {item.name || item.title}
              </h3>
              <p className="text-2xl font-bold text-pink-600 mb-4">
                ${item.price}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;