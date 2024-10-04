'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const [activeLink, setActiveLink] = useState('/'); // State to keep track of the active link

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the mobile menu open/close
  };

  const handleLinkClick = (path) => {
    setActiveLink(path); // Update the active link when a link is clicked
    setIsOpen(false); // Close the mobile menu when a link is clicked
  };

  return (
    <nav className="bg-gradient-to-r from-green-400 to-blue-500 shadow-lg fixed w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" onClick={() => handleLinkClick('/')}>
              <span className="text-white text-3xl font-extrabold tracking-wide cursor-pointer hover:text-gray-200 transition-all duration-300">
                Archean
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <span
                onClick={() => handleLinkClick('/')}
                className={`${
                  activeLink === '/' ? 'bg-orange-500 text-white' : 'text-white'
                } hover:text-gray-200 px-4 py-2 rounded-md text-lg font-medium transition-all duration-300 cursor-pointer`}
              >
                Home
              </span>
            </Link>

            <Link href="/live-world">
              <span
                onClick={() => handleLinkClick('/live-world')}
                className={`${
                  activeLink === '/live-world'
                    ? 'bg-orange-500 text-white'
                    : 'text-white'
                } hover:text-gray-200 px-4 py-2 rounded-md text-lg font-medium transition-all duration-300 cursor-pointer`}
              >
                Live World
              </span>
            </Link>

            {/* Archean Button */}
            <Link href="/archean">
              <button
                onClick={() => handleLinkClick('/archean')}
                className={`${
                  activeLink === '/archean'
                    ? 'bg-orange-500 text-white'
                    : 'text-white'
                } hover:text-gray-200 px-4 py-2 rounded-md text-lg font-medium transition-all duration-300 cursor-pointer`}
              >
                Archean
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white inline-flex items-center justify-center p-2 rounded-md hover:text-gray-200 hover:bg-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    className="inline-flex"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    className="inline-flex"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-400">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" onClick={() => handleLinkClick('/')}>
              <span
                className={`${
                  activeLink === '/' ? 'bg-orange-500 text-white' : 'text-white'
                } block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 hover:text-gray-200 transition-all duration-300 cursor-pointer`}
              >
                Home
              </span>
            </Link>

            <Link href="/live-world" onClick={() => handleLinkClick('/live-world')}>
              <span
                className={`${
                  activeLink === '/live-world'
                    ? 'bg-orange-500 text-white'
                    : 'text-white'
                } block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 hover:text-gray-200 transition-all duration-300 cursor-pointer`}
              >
                Live World
              </span>
            </Link>

            {/* Archean Button */}
            <Link href="/archean" onClick={() => handleLinkClick('/archean')}>
              <button
                className={`${
                  activeLink === '/archean'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-green-600'
                } w-full font-bold py-2 px-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300`}
              >
                Archean
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
