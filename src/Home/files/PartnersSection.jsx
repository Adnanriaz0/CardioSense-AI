import React from "react";

// Data Definitions (moved here for coherence)
const partners = [
  { name: "IQRA University", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Iqra_University_seal.svg/1200px-Iqra_University_seal.svg.png" },
  { name: "Global Health Alliance", logo: "https://via.placeholder.com/150x75?text=Global+Health+Alliance" },
  { name: "Innovate AI Solutions", logo: "https://via.placeholder.com/150x75?text=Innovate+AI+Solutions" },
  { name: "Precision Diagnostics", logo: "https://via.placeholder.com/150x75?text=Precision+Diagnostics" },
  { name: "Wearable Tech Corp", logo: "https://via.placeholder.com/150x75?text=Wearable+Tech+Corp" },
  { name: "Medical Device Fund", logo: "https://via.placeholder.com/150x75?text=Medical+Device+Fund" },
];

const PartnersSection = ({ sectionRef }) => {
  return (
    <section id="partners" ref={(el) => (sectionRef.current[7] = el)} className="py-20 md:py-24 bg-white dark:bg-gray-900 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-12 animate-fade-in-up">
          Our Valued <span className="text-blue-600 dark:text-blue-400">Partners</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex justify-center items-center h-24 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md transform transition-all duration-300 hover:scale-110 hover:shadow-xl animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                title={partner.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;