import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaClock, FaShippingFast } from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

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

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 pt-20 pb-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent mb-6 animate-pulse">
<span className="text-amber-500 animate-bounce inline-block">Contact Us</span>
</h1>
          <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
            We're here to help! Get in touch with our team for any questions about our fashion collections, 
            orders, or collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          
          {/* Contact Information - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-amber-200/50 hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
                    <FaPhone className="text-white text-lg" />
                  </div>
                  Get In Touch
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-5 p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl hover:from-amber-100 hover:to-orange-100 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FaPhone className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Phone</p>
                      <p className="text-lg font-bold text-gray-900">+855 12 345 678</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl hover:from-amber-100 hover:to-orange-100 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FaEnvelope className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Email</p>
                      <p className="text-lg font-bold text-gray-900">info@stylehub.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl hover:from-amber-100 hover:to-orange-100 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FaMapMarkerAlt className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Address</p>
                      <p className="text-lg font-bold text-gray-900">123 Fashion District, Phnom Penh</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8 pt-8 border-t border-amber-200/50">
                  <h4 className="font-bold text-gray-900 text-lg mb-6">Follow Our Style</h4>
                  <div className="flex gap-4">
                    {[
                      { icon: FaFacebook, color: "bg-blue-500 hover:bg-blue-600" },
                      { icon: FaInstagram, color: "bg-pink-500 hover:bg-pink-600" },
                      { icon: FaTwitter, color: "bg-sky-500 hover:bg-sky-600" }
                    ].map((social, index) => (
                      <a key={index} href="#" className={`w-14 h-14 ${social.color} rounded-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg`}>
                        <social.icon className="text-xl" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl shadow-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <FaClock className="text-amber-200" />
                  Store Hours
                </h3>
                <div className="space-y-3 text-amber-50">
                  <div className="flex justify-between items-center py-2 border-b border-amber-400/30">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="font-bold">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-amber-400/30">
                    <span className="font-medium">Saturday</span>
                    <span className="font-bold">10:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Sunday</span>
                    <span className="font-bold">11:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form & Map - Right Side */}
          <div className="lg:col-span-3 space-y-8">
            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 border border-amber-200/50">
              <div className="text-center mb-10">
                <h3 className="text-4xl font-bold text-gray-900 mb-3">Send Us a Message</h3>
                <p className="text-gray-600 text-lg">We typically respond within 2 hours during business days</p>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="block text-lg font-semibold text-gray-800">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 text-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-lg font-semibold text-gray-800">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-lg font-semibold text-gray-800">
                    Your Message *
                  </label>
                  <textarea
                    placeholder="Tell us how we can help you..."
                    rows="6"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 text-lg resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3 group"
                >
                  <FaPaperPlane className="group-hover:scale-110 transition-transform duration-300" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Large Map Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-amber-200/50">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaMapMarkerAlt className="text-amber-500" />
                Visit Our Store
              </h3>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.8503873991763!2d104.90181277364715!3d11.56258119420418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109511276ad62c1%3A0x41c060b46d8855bf!2z4Z6f4Z6E4Z-S4Z6A4Z624Z6P4Z-L4Z6V4Z-S4Z6f4Z624Z6a4Z6K4Z-B4Z6U4Z-J4Z684Z6R4Z64IOGfoywg4Z6X4Z-S4Z6T4Z-G4Z6W4Z-B4Z6J!5e0!3m2!1skm!2skh!4v1761316227040!5m2!1skm!2skh" 
                  width="100%" 
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                ></iframe>
              </div>
              <div className="mt-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <FaShippingFast className="text-amber-500 text-2xl" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Free Parking Available</h4>
                    <p className="text-gray-600">Convenient location with ample parking space</p>
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

export default Contact;