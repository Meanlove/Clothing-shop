import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaHeart, FaShoppingCart, FaArrowRight } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; // ✅ ADD THIS IMPORT

const Women = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist(); // ✅ ADD THIS LINE

  // ✅ REMOVE THIS OLD WISHLIST CODE (លុប 9 ខ្សែនេះចេញ):
  // const [wishlist, setWishlist] = useState(new Set());
  // const toggleWishlist = (id) => {
  //   const newWishlist = new Set(wishlist);
  //   if (newWishlist.has(id)) {
  //     newWishlist.delete(id);
  //   } else {
  //     newWishlist.add(id);
  //   }
  //   setWishlist(newWishlist);
  // };

  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Women's Elegant Collection",
      subtitle: "Discover sophisticated fashion for the modern woman",
      buttonText: "Shop Now",
    },
    {
      image:
        "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Spring Trends",
      subtitle: "Embrace the latest styles and seasonal must-haves",
      buttonText: "Explore Trends",
    },
    {
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Evening Glamour",
      subtitle: "Stunning dresses for your special occasions",
      buttonText: "Discover Dresses",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        item.name.toLowerCase().includes(selectedCategory)
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
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredData(results);
  }, [data, sortBy, priceRange, searchTerm, selectedCategory]);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Hero Header Section - Similar to Homepage */}
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
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              {heroSlides[currentSlide].subtitle}
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
                Shop Collection
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <div id="products" className="py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Results Count */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold text-pink-600">
                {filteredData.length}
              </span>{" "}
              products
            </p>
          </div>

          {/* Product Grid */}
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
                      alt={item.name}
                      className="w-full h-64 object-contain p-4 group-hover:scale-110 transition-transform duration-500"
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
                          ? "bg-rose-500 text-white"
                          : "bg-white/80 text-gray-600"
                      } hover:scale-105 active:scale-95`}
                    >
                      <FaHeart className="text-sm" />
                    </button>

                    {/* Rating Badge */}
                    <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span>{item.rating || 4.5}</span>
                      </div>
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
                    <h3 className="font-semibold text-gray-800 line-clamp-2 mb-3 group-hover:text-pink-600 transition-colors duration-300">
                      {item.name}
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
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Women;