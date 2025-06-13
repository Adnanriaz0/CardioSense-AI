import React from "react";
import FeatureCard from "./FeatureCard"; // Import the FeatureCard component
import {
  FaHeartbeat, FaBrain, FaMobileAlt, FaWifi, FaComments, FaAward,
  FaBuilding, FaMicrophone, FaCloudUploadAlt, FaChartLine
} from "react-icons/fa";
import { BiDevices, BiAnalyse } from "react-icons/bi";
import { MdSecurity, MdSpeed } from "react-icons/md";

// Data Definitions (moved here for coherence with the component)
const features = [
  {
    title: "Real-Time PCG Acquisition",
    desc: "Our portable IoT device captures heart sounds instantly, ensuring continuous, high-fidelity data flow for immediate insights.",
    icon: <FaMicrophone className="text-blue-600 dark:text-blue-400 text-5xl mb-4" />,
  },
  {
    title: "AI-Driven Analysis",
    desc: "Leveraging advanced Convolutional (CNN) and Recurrent Neural Network (LSTM) models, our system accurately analyzes heart sounds for abnormalities.",
    icon: <FaBrain className="text-green-600 dark:text-green-400 text-5xl mb-4" />,
  },
  {
    title: "Intuitive User Interface",
    desc: "Designed for both patients and healthcare professionals, our intuitive mobile and web interface offers easy access to visualized heart data and alerts.",
    icon: <FaMobileAlt className="text-purple-600 dark:text-purple-400 text-5xl mb-4" />,
  },
  {
    title: "Secure Data Transmission",
    desc: "Seamlessly transmit vital heart data to our encrypted cloud platform via Wi-Fi/Bluetooth/LoRa, enabling remote and reliable monitoring.",
    icon: <MdSecurity className="text-red-600 dark:text-red-400 text-5xl mb-4" />,
  },
  {
    title: "Explainable AI (XAI)",
    desc: "Beyond mere detection, our system provides clear, interpretable explanations for AI classifications, fostering trust and complementing human diagnosis.",
    icon: <FaComments className="text-yellow-600 dark:text-yellow-400 text-5xl mb-4" />,
  },
  {
    title: "Rapid Early Detection",
    desc: "Empower proactive healthcare through the swift identification of cardiovascular issues, critical for timely medical intervention and improved patient outcomes.",
    icon: <MdSpeed className="text-teal-600 dark:text-teal-400 text-5xl mb-4" />,
  },
];

const FeaturesSection = ({ sectionRef }) => {
  return (
    <section id="features" ref={(el) => (sectionRef.current[2] = el)} className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 animate-fade-in-up">
          Key Features of <span className="text-blue-600 dark:text-blue-400">SmartBeat</span>
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-16 animate-fade-in-up-delay-100">
          SmartBeat integrates cutting-edge IoT and AI to provide unparalleled heart health monitoring.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;