import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaMinus,
  FaTrash,
  FaShoppingBag,
  FaArrowLeft,
  FaCreditCard,
  FaLock,
  FaTruck,
  FaShieldAlt,
  FaHeart,
  FaHome,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  } = useCart();

  const getSubtotal = () => {
    return getCartTotal();
  };

  const getShippingCost = () => {
    return 0;
  };

  const getTax = () => {
    return getSubtotal() * 0.08;
  };

  const getTotal = () => {
    return getSubtotal() + getShippingCost();
  };

  const continueShopping = () => {
    navigate("/all-collections");
  };

  const proceedToCheckout = () => {
    // Show success message instead of alert
    const checkoutSuccessful = true; // You can add real checkout logic here

    if (checkoutSuccessful) {
      // Clear the cart after successful checkout
      clearCart();
      alert("Checkout successful! Thank you for your purchase.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Shopping Cart
            </h1>
            <p className="text-gray-600">Your fashion journey starts here</p>
          </div>

          {/* Empty Cart */}
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingBag className="text-3xl text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start
              shopping to discover amazing products!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={continueShopping}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg"
              >
                Continue Shopping
              </button>
              <Link
                to="/"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                <FaHome />
                Go Home
              </Link>
            </div>
          </div>

          {/* Quick Links to Collections */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Popular Collections
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/men"
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 text-center hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-lg"
              >
                <h4 className="text-xl font-bold mb-2">Men's Collection</h4>
                <p className="text-blue-100">Discover trendy fashion for men</p>
              </Link>
              <Link
                to="/women"
                className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl p-6 text-center hover:from-pink-600 hover:to-rose-700 transition-all duration-300 hover:shadow-lg"
              >
                <h4 className="text-xl font-bold mb-2">Women's Collection</h4>
                <p className="text-pink-100">Elegant styles for women</p>
              </Link>
              <Link
                to="/all-collections"
                className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 text-center hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg"
              >
                <h4 className="text-xl font-bold mb-2">All Products</h4>
                <p className="text-purple-100">Browse everything we offer</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            Review your items and proceed to checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Cart Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  Your Items ({getCartItemsCount()})
                </h2>
                <button
                  onClick={continueShopping}
                  className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
                >
                  <FaArrowLeft />
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg mb-1">
                            {item.name}
                          </h3>
                          <p className="text-gray-600 text-sm capitalize">
                            {item.category}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-300 p-1"
                            title="Remove item"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
                          >
                            <FaMinus className="text-xs" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
                          >
                            <FaPlus className="text-xs" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-sm text-gray-500">
                              ${item.price} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <FaTruck className="text-2xl text-green-600 mb-2" />
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Free Shipping
                  </h4>
                  <p className="text-sm text-gray-600">On all orders</p>
                </div>
                <div className="flex flex-col items-center">
                  <FaShieldAlt className="text-2xl text-blue-600 mb-2" />
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Secure Checkout
                  </h4>
                  <p className="text-sm text-gray-600">
                    256-bit SSL encryption
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <FaLock className="text-2xl text-purple-600 mb-2" />
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Easy Returns
                  </h4>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              {/* Pricing Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({getCartItemsCount()} items)</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={proceedToCheckout}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:shadow-lg mb-4 flex items-center justify-center gap-2"
              >
                <FaCreditCard />
                Proceed to Checkout
              </button>

              {/* Security Notice */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
                  <FaLock className="text-xs" />
                  <span>Secure and encrypted checkout</span>
                </div>
                <p className="text-xs text-gray-400">
                  By completing your purchase you agree to our Terms of Service
                </p>
              </div>

              {/* Payment Methods */}
              <div className="border-t border-gray-200 mt-6 pt-6">
                <p className="text-sm text-gray-600 mb-3">We accept:</p>
                <div className="flex gap-3">
                  {["Visa", "Mastercard", "PayPal", "Apple Pay"].map(
                    (method) => (
                      <div
                        key={method}
                        className="w-12 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-medium text-gray-600"
                      >
                        {method}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
