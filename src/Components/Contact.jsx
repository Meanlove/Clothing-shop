import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }
    if (!message.trim()) {
      alert("Please write your message.");
      return;
    }

    alert(`Thank you, ${name}! Your message has been sent.`);
    // Clear the form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-12 text-white">
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl shadow-xl p-10 w-full max-w-lg">
        <h3 className="text-4xl font-bold text-center mb-6">
          Contact <span className="text-yellow-300">Us</span>
        </h3>
        <p className="text-center text-white/90 mb-8">
          We’d love to hear from you! Send us a message and we’ll get back soon.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1 font-semibold">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-semibold">Message</label>
            <textarea
              placeholder="Write your message..."
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-300 text-purple-700 py-2 rounded-md font-bold hover:bg-white hover:text-purple-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="flex space-x-6 mt-8 text-2xl">
        <a href="#" className="hover:text-yellow-300 transition duration-300">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#" className="hover:text-yellow-300 transition duration-300">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="hover:text-yellow-300 transition duration-300">
          <i className="fab fa-twitter"></i>
        </a>
      </div>

      <footer className="mt-8 text-sm opacity-70">
        © 2025 Khmer Clothes. All rights reserved.
      </footer>
    </div>
  );
};

export default Contact;
