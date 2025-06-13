import React from "react";
import { FaAward } from "react-icons/fa";

// Data Definitions (moved here for coherence)
const awards = [
  "IQRA University FYP Excellence Award 2025 (Anticipated)",
  "HealthTech Innovation Challenge Finalist 2024",
  "Top MedTech Startup Pitch - National Innovation Summit 2023",
  "Best IoT Solution in Healthcare - Tech for Good Awards (Project Stage)",
];

const AwardsSection = ({ sectionRef }) => {
  return (
    <section id="awards" ref={(el) => (sectionRef.current[6] = el)} className="py-20 md:py-24 bg-gray-50 dark:bg-gray-800 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-12 animate-fade-in-up">
          Our <span className="text-green-600 dark:text-green-400">Recognition & Milestones</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg flex items-center justify-center space-x-4 animate-fade-in-up transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200 dark:border-gray-700"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <FaAward className="text-yellow-500 text-3xl flex-shrink-0" />
              <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">{award}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;