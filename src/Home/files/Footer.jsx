import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">SmartBeat</h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            Pioneering IoT and AI for proactive cardiac health monitoring.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <FaFacebook className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { label: "Features", href: "#features" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "Technology", href: "#technology" },
              { label: "Our Team", href: "#team" },
              { label: "Testimonials", href: "#testimonials" },
            ].map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2">
            {[
              { label: "Blog", href: "#blog" },
              { label: "FAQ", href: "#faq" },
              { label: "Privacy Policy", href: "/privacy" }, // Placeholder
              { label: "Terms of Service", href: "/terms" }, // Placeholder
              { label: "Support", href: "/support" }, // Placeholder
            ].map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-gray-400 mb-2">Email: info@smartbeat.com</p>
          <p className="text-gray-400 mb-2">Phone: +1 (555) 123-4567</p>
          <p className="text-gray-400">Address: 123 Health Ave, Innovation City, CA 90210</p>
        </div>
      </div>

      <div className="border-t border-gray-700 dark:border-gray-800 mt-10 pt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} SmartBeat. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;