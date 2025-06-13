import React from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTopButton = ({ showBackToTop, scrollToTop }) => {
  if (!showBackToTop) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-blue-600 dark:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-400 animate-bounce-subtle z-50"
      aria-label="Back to top"
      title="Scroll to Top"
    >
      <FaArrowUp className="text-xl" />
    </button>
  );
};

export default BackToTopButton;