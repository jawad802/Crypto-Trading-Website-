"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import SearchBar from "@/components/search/SearchBar";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Search", href: "#" }, // Changed to '#' since we handle it with onClick state now
  { name: "Tokens", href: "/tokens" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // 2. Add the state to track if the search popup modal is open
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="w-full bg-[#0B0E11] border-b border-gray-800 text-white font-sans selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo Brand Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#39E11B] bg-transparent">
              <svg
                className="w-5 h-5 text-[#39E11B]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Coin<span className="italic font-extrabold text-gray-100">Pulse</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              // 3. IF the link is "Search", render a click action button instead of an anchor page navigation route
              if (link.name === "Search") {
                return (
                  <button
                    key={link.name}
                    onClick={() => setSearchOpen(true)}
                    className="text-base font-medium transition-colors duration-200 text-[#848E9C] hover:text-white focus:outline-none"
                  >
                    {link.name}
                  </button>
                );
              }

              // Normal route links for Home and Tokens
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-medium transition-colors duration-200 hover:text-white ${isActive ? "text-white" : "text-[#848E9C]"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[#848E9C] hover:text-white focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-60 opacity-100 border-t border-gray-800" : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-[#0B0E11]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            if (link.name === "Search") {
              return (
                <button
                  key={link.name}
                  onClick={() => {
                    setIsOpen(false);   // Closes mobile menu burger drawer layout
                    setSearchOpen(true); // Opens search popup modal interface panel
                  }}
                  className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-[#848E9C] hover:bg-gray-900 hover:text-white transition-colors"
                >
                  {link.name}
                </button>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors ${isActive ? "bg-gray-900 text-white" : "text-[#848E9C] hover:bg-gray-900 hover:text-white"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. Placed the component portal layer template configurations exactly at the base root of the navbar wrapper */}
      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
}