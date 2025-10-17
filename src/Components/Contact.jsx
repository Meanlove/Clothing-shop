import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!name.trim()) {
      Swal.fire({
        title: "Missing Name",
        text: "Please enter your name",
        icon: "warning",
        confirmButtonColor: "#F59E0B",
        draggable: true
      });
      return;
    }
    if (!email.trim()) {
      Swal.fire({
        title: "Missing Email",
        text: "Please enter your email",
        icon: "warning",
        confirmButtonColor: "#F59E0B",
        draggable: true
      });
      return;
    }
    if (!message.trim()) {
      Swal.fire({
        title: "Missing Message",
        text: "Please write your message",
        icon: "warning",
        confirmButtonColor: "#F59E0B",
        draggable: true
      });
      return;
    }

    // Success message
    Swal.fire({
      title: "Message Sent!",
      html: `
        <div class="text-center">
          <p class="text-lg mb-2">Thank you, <strong>${name}</strong>!</p>
          <p>We'll get back to you within 24 hours.</p>
        </div>
      `,
      icon: "success",
      confirmButtonText: "Great!",
      confirmButtonColor: "#10B981",
      draggable: true
    });

    // Clear the form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 pt-20 pb-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions about our products? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors duration-300">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                    <FaPhone className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold text-gray-800">+855 12 345 678</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors duration-300">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-800">info@clothingshop.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors duration-300">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-semibold text-gray-800">123 Fashion Street, Phnom Penh</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300 hover:scale-110">
                    <FaFacebook className="text-xl" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300 hover:scale-110">
                    <FaInstagram className="text-xl" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300 hover:scale-110">
                    <FaTwitter className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h3>
              <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you soon.</p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    placeholder="Tell us about your inquiry..."
                    rows="6"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FaPaperPlane className="text-sm" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-amber-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-2">What's your return policy?</h4>
                <p className="text-gray-600 text-sm">We offer 30-day returns for all unworn items with original tags.</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-2">Do you ship internationally?</h4>
                <p className="text-gray-600 text-sm">Yes, we ship worldwide with various shipping options available.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-2">How long does shipping take?</h4>
                <p className="text-gray-600 text-sm">Domestic: 2-3 business days. International: 7-14 business days.</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-2">What payment methods do you accept?</h4>
                <p className="text-gray-600 text-sm">We accept credit cards, PayPal, and bank transfers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;