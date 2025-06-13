import React from "react";

const TestimonialCard = ({ quote, name, title, avatar }) => {
  return (
    <div className="testimonial-card bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 dark:border-gray-700">
      <img
        src={avatar}
        alt={name}
        className="w-24 h-24 rounded-full mb-6 object-cover border-4 border-blue-500 dark:border-blue-400"
      />
      <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-6">"{quote}"</p>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{name}</h3>
      <p className="text-blue-600 dark:text-blue-400 text-md">{title}</p>
    </div>
  );
};

export default TestimonialCard;