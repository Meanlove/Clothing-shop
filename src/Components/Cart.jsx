import React, { useState, useEffect } from "react";
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
  FaArrowRight,
  FaChevronDown, // ✅ ADD THIS IMPORT
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    updateSize, // ✅ ADD THIS FUNCTION TO CART CONTEXT
    clearCart,
    getCartTotal,
    getCartItemsCount,
  } = useCart();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [openSizeDropdowns, setOpenSizeDropdowns] = useState({}); // ✅ ADD STATE FOR DROPDOWNS

  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Your Shopping Cart",
      subtitle: "Review your selected items and complete your order",
      buttonText: "Continue Shopping",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Secure Checkout",
      subtitle: "Safe and encrypted payment processing",
      buttonText: "Shop More",
    },
    {
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Fast Delivery",
      subtitle: "Free shipping on all orders",
      buttonText: "Browse Collections",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ ADD SIZE DROPDOWN TOGGLE HANDLER
  const toggleSizeDropdown = (itemId, size) => {
    setOpenSizeDropdowns(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // ✅ ADD SIZE UPDATE HANDLER
  const handleSizeUpdate = (itemId, currentSize, newSize) => {
    if (currentSize !== newSize) {
      updateSize(itemId, currentSize, newSize);
    }
    setOpenSizeDropdowns(prev => ({
      ...prev,
      [itemId]: false
    }));
  };

  const getSubtotal = () => {
    return getCartTotal();
  };

  const getShippingCost = () => {
    return 0;
  };

  const getTotal = () => {
    return getSubtotal() + getShippingCost();
  };

  const continueShopping = () => {
    navigate("/all-collections");
  };

const proceedToCheckout = () => {
  Swal.fire({
    title: "Confirm Your Order?",
    html: `
      <div class="text-left">
        <p class="mb-2"><strong>Items:</strong> ${getCartItemsCount()}</p>
        <p class="mb-2"><strong>Subtotal:</strong> $${getSubtotal().toFixed(2)}</p>
        <p class="mb-2"><strong>Shipping:</strong> FREE</p>
        <p class="mb-4"><strong>Total:</strong> $${getTotal().toFixed(2)}</p>
        <p class="text-sm text-gray-600">Please review your order before proceeding.</p>
      </div>
    `,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, Proceed to Pay",
    cancelButtonText: "Review Order",
    confirmButtonColor: "green",
    cancelButtonColor: "red",
    reverseButtons: true,
    draggable: true,
    customClass: {
      popup: "rounded-2xl",
      confirmButton: "px-6 py-3 rounded-xl font-semibold",
      cancelButton: "px-6 py-3 rounded-xl font-semibold",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Show redirecting message immediately when user confirms
      Swal.fire({
        title: "Redirecting...",
        text: "Please wait while we process your payment",
        icon: "info",
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 2500, // 2.5 seconds
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        }
      }).then(() => {
        // After 2.5 seconds, process payment and show success message
        processPayment();
      });
    }
  });
};

const processPayment = () => {
  Swal.fire({
    title: "THANK YOU FOR YOUR PURCHASE!",
    html: `
      <div class="text-center">
        <div class="mb-10">
          <img 
            src="https://i.pinimg.com/originals/96/9c/3a/969c3a7d11ac4a0d6a5b73d90928603e.gif" 
            alt="Success" 
            class="w-80 h-80 mx-auto rounded-3xl object-cover shadow-2xl"
          />
        </div>
        <p class="mb-8 text-4xl font-bold text-green-600">PAYMENT SUCCESSFUL!</p>
      </div>
    `,
    width: "900px",
    padding: "5rem",
    background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #f0f9ff 100%)",
    showConfirmButton: true,
    confirmButtonText: "CONTINUE SHOPPING",
    confirmButtonColor: "#059669",
    draggable: true,
    customClass: {
      popup: "rounded-4xl shadow-3xl border-4 border-green-100",
      title: "text-5xl font-black text-gray-900 mb-8 tracking-wide",
      confirmButton: "px-12 py-6 rounded-2xl font-black text-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-3xl",
      htmlContainer: "text-2xl",
      actions: "gap-6 mt-8"
    },
    buttonsStyling: false,
  }).then((result) => {
    if (result.isConfirmed) {
      clearCart();
      navigate("/all-collections");
    }
  });
};

  // ✅ DEFINE AVAILABLE SIZES FOR EACH PRODUCT TYPE
  const getAvailableSizes = (category) => {
    switch (category) {
      case "men's clothing":
        return ["S", "M", "L", "XL",];
      case "women's clothing":
        return ["S", "M", "L", "XL"];
      default:
        return ["S", "M", "L", "XL"];
    }
  };

if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Hero Header for Empty Cart */}
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
                Shopping Cart
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                Your fashion journey starts here
              </p>

              <div className="flex gap-4 justify-center items-center">
                <button
                  onClick={continueShopping}
                  className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-400 hover:scale-105 transform transition-all duration-300 shadow-2xl flex items-center gap-2"
                >
                  Start Shopping
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Empty Cart Content */}
        <div className="py-10 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Empty Cart Message */}
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
                  <p className="text-blue-100">
                    Discover trendy fashion for men
                  </p>
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Header for Cart with Items */}
      <section className="relative h-64 overflow-hidden">
        {/* ... (hero section code remains the same) */}
      </section>

      {/* Cart Content */}
      <div className="py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
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
                    key={`${item.id}-${item.size || 'no-size'}`}
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
                            
                            {/* ✅ UPDATED SIZE SELECTOR IN CART */}
                            <div className="mt-2">
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600">Size:</span>
                                <div className="relative">
                                  <button
                                    onClick={() => toggleSizeDropdown(item.id, item.size)}
                                    className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                  >
                                    <span>{item.size}</span>
                                    <FaChevronDown className={`text-xs transition-transform duration-200 ${openSizeDropdowns[item.id] ? 'rotate-180' : ''}`} />
                                  </button>
                                  
                                  {/* Size Dropdown */}
                                  {openSizeDropdowns[item.id] && (
                                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-2 min-w-[80px]">
                                      <div className="flex flex-col gap-1">
                                        {getAvailableSizes(item.category).map((size) => (
                                          <button
                                            key={size}
                                            onClick={() => handleSizeUpdate(item.id, item.size, size)}
                                            className={`px-2 py-1 text-sm rounded-md transition-colors duration-200 text-left ${
                                              item.size === size
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-700 hover:bg-blue-50'
                                            }`}
                                          >
                                            {size}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => removeFromCart(item.id, item.size)}
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
                                updateQuantity(item.id, item.quantity - 1, item.size)
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
                                updateQuantity(item.id, item.quantity + 1, item.size)
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
                    <p className="text-sm text-gray-600">
                      30-day return policy
                    </p>
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
                    By completing your purchase you agree to our Terms of
                    Service
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
    </div>
  );
};

export default Cart;