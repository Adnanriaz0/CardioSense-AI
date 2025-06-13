import React from "react";
import BlogPostCard from "./BlogPostCard"; // Import the BlogPostCard component

// Data Definitions (moved here for coherence)
const blogPosts = [
  {
    title: "The Transformative Power of IoT in Preventive Cardiology",
    link: "https://example.com/blog/iot-preventive-cardiology",
    image: "https://via.placeholder.com/600x400?text=IoT+Cardiology",
    excerpt: "Explore how interconnected devices are revolutionizing early detection and ongoing management of cardiovascular diseases, enabling truly preventive care.",
  },
  {
    title: "Decoding Heart Sounds: The Magic of AI in PCG Analysis",
    link: "https://example.com/blog/ai-pcg-analysis",
    image: "https://via.placeholder.com/600x400?text=AI+PCG+Decoding",
    excerpt: "Dive deep into how advanced AI algorithms, specifically CNNs and LSTMs, interpret the subtle nuances of heart sounds to identify complex anomalies.",
  },
  {
    title: "SmartBeat's Patient-Centric Design: Empowering Self-Monitoring",
    link: "https://example.com/blog/patient-centric-design",
    image: "https://via.placeholder.com/600x400?text=Patient+Care",
    excerpt: "Understand the philosophy behind SmartBeat's user-friendly interface and how it empowers patients to take an active role in their cardiac health.",
  },
  {
    title: "The Ethical Implications of Explainable AI in Medicine",
    link: "https://example.com/blog/xai-ethics",
    image: "https://via.placeholder.com/600x400?text=AI+Ethics",
    excerpt: "A critical discussion on the importance of transparency in AI-driven medical diagnostics and how SmartBeat embraces XAI for enhanced trust and clinical confidence.",
  },
];

const BlogSection = ({ sectionRef }) => {
  return (
    <section id="blog" ref={(el) => (sectionRef.current[5] = el)} className="py-20 md:py-32 bg-gray-100 dark:bg-gray-900 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 animate-fade-in-up">
          Latest Insights from Our <span className="text-blue-600 dark:text-blue-400">Blog</span>
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-16 animate-fade-in-up-delay-100">
          Stay informed with our latest articles on health tech, AI in medicine, and cardiovascular care.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {blogPosts.map((post, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
              <BlogPostCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;