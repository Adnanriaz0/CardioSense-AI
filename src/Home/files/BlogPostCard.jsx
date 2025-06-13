import React from "react";

const BlogPostCard = ({ title, link, image, excerpt }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 dark:border-gray-700"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-base">{excerpt}</p>
        <span className="mt-4 inline-block text-blue-600 dark:text-blue-400 font-semibold hover:underline">
          Read More →
        </span>
      </div>
    </a>
  );
};

export default BlogPostCard;