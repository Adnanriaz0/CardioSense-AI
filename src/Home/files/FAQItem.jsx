import React from "react";

const FAQItem = ({ q, a }) => {
  return (
    <details className="mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg border border-gray-200 dark:border-gray-700">
      <summary className="flex justify-between items-center px-6 py-4 cursor-pointer text-xl font-semibold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg">
        {q}
        <span className="details-arrow transform transition-transform duration-300">
          <svg
            className="w-6 h-6 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </span>
      </summary>
      <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-gray-700">
        <p>{a}</p>
      </div>
    </details>
  );
};

export default FAQItem;