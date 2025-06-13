import React from "react";

const FeatureCard = ({ title, desc, icon }) => {
  return (
    <div className="feature-card bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 dark:border-gray-700">
      {icon}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-lg">{desc}</p>
    </div>
  );
};

export default FeatureCard;