import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      setError("Email address cannot be empty.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address (e.g., example@domain.com).");
      return;
    }
    setSubscribed(true);
    setEmail("");
    setError("");
    // In a real project, you would send this to your backend API
    console.log("Subscribed with:", email);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Optionally revert subscribed state after a few seconds or redirect
    // setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <section id="newsletter" className="py-20 bg-blue-600 dark:bg-blue-800 text-white px-6">
      <div className="container mx-auto text-center max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 animate-fade-in-up">
          Stay Updated with SmartBeat
        </h2>
        <p className="text-lg mb-10 animate-fade-in-up-delay-100">
          Subscribe to our newsletter for the latest news, updates, and insights from the world of cardiac health and AI.
        </p>
        {!subscribed ? (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-200">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(""); // Clear error on change
              }}
              className="flex-grow p-4 rounded-full border-2 border-white focus:outline-none focus:ring-4 focus:ring-blue-300 text-gray-900 placeholder-gray-500 text-lg sm:max-w-md"
              aria-label="Email for newsletter subscription"
            />
            <button
              type="submit"
              className="bg-white text-blue-700 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center text-lg"
            >
              <FaPaperPlane className="mr-3" /> Subscribe
            </button>
          </form>
        ) : (
          <div className="text-center text-green-200 text-2xl font-bold animate-fade-in-up">
            <p>Thank you for subscribing!</p>
            <p className="text-xl mt-2">You'll receive updates directly in your inbox.</p>
          </div>
        )}
        {error && <p className="text-red-300 mt-4 text-center text-md animate-pulse">{error}</p>}
      </div>
    </section>
  );
};

export default NewsletterSection;