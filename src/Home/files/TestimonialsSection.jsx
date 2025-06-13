import React from "react";
import TestimonialCard from "./TestimonialCard"; // Import the TestimonialCard component

// Data Definitions (moved here for coherence)
const testimonials = [
  {
    quote: "SmartBeat is a phenomenal leap in telemedicine. Its real-time, AI-powered diagnostics could drastically improve patient outcomes, especially in underserved regions. I'm excited about its potential.",
    name: "Dr. Aisha Khan",
    title: "Senior Cardiologist, National Institute of Heart Diseases",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote: "As a technology enthusiast and future medical professional, I'm genuinely impressed by SmartBeat's seamless integration of IoT and AI. The intuitive interface makes complex data accessible to everyone.",
    name: "Ali Raza",
    title: "Medical Informatics Student & Health Innovator",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote: "The emphasis on Explainable AI is what truly sets SmartBeat apart. It builds immense trust by providing clear rationale behind its classifications, a crucial factor for clinical adoption.",
    name: "Sarah Ahmed",
    title: "HealthTech Investment Analyst",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    quote: "For rural clinics like ours, SmartBeat offers an unprecedented opportunity for early cardiac screening. It's affordable, accurate, and significantly reduces the need for patients to travel long distances for initial diagnosis.",
    name: "Dr. Imran Malik",
    title: "General Practitioner, Rural Healthcare Foundation",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    quote: "The ability to continuously monitor heart health from home with professional oversight is revolutionary. SmartBeat empowers patients to take control of their well-being with confidence and peace of mind.",
    name: "Fatima Sohail",
    title: "Early Adopter & Patient Advocate",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
];

const TestimonialsSection = ({ sectionRef }) => {
  return (
    <section id="testimonials" ref={(el) => (sectionRef.current[3] = el)} className="py-20 md:py-32 bg-gray-100 dark:bg-gray-900 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 animate-fade-in-up">
          What Our <span className="text-blue-600 dark:text-blue-400">Community Says</span>
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-16 animate-fade-in-up-delay-100">
          Hear from healthcare professionals, patients, and innovators on the impact of SmartBeat.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;