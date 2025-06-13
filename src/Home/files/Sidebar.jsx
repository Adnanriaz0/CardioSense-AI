import React from 'react';
import { FaTimes, FaHome, FaInfoCircle, FaLaptopCode, FaUsers, FaQuoteLeft, FaQuestionCircle, FaBloggerB, FaEnvelope }from 'react-icons/lib/all'; // Importing icons for the sidebar

const Sidebar = ({ isOpen, toggleSidebar }) => {
  // Define your navigation links. These should ideally match your Navbar links.
  const navLinks = [
    { id: "home", label: "Home", icon: <FaHome /> },
    { id: "features", label: "Features", icon: <FaInfoCircle /> },
    { id: "how-it-works", label: "How It Works", icon: <FaLaptopCode /> },
    { id: "technology", label: "Technology", icon: <FaLaptopCode /> }, // Can reuse icon
    { id: "team", label: "Our Team", icon: <FaUsers /> },
    { id: "testimonials", label: "Testimonials", icon: <FaQuoteLeft /> },
    { id: "faq", label: "FAQ", icon: <FaQuestionCircle /> },
    { id: "blog", label: "Blog", icon: <FaBloggerB /> },
    { id: "contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  return (
    <>
      {/* Overlay for when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden"
          onClick={toggleSidebar} // Close sidebar when clicking outside
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar Content */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-50 shadow-lg
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:hidden`} {/* Hide on medium screens and up */}
        role="navigation"
        aria-label="Main Navigation Sidebar"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-blue-400">SmartBeat Menu</h2>
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-blue-300 text-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1"
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>
        <nav className="mt-8 px-4">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id} className="mb-2">
                <a
                  href={`#${link.id}`}
                  onClick={toggleSidebar} // Close sidebar when a link is clicked
                  className="flex items-center py-3 px-4 rounded-lg text-lg font-medium hover:bg-gray-700 hover:text-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {link.icon && <span className="mr-4 text-xl">{link.icon}</span>}
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-6">
                <a
                    href="/login"
                    onClick={toggleSidebar}
                    className="flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400"
                >
                    Login
                </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;