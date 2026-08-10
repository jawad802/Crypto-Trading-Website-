"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";
import SearchBar from "@/components/search/SearchBar";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Search", href: "#" },
  { name: "Tokens", href: "/tokens" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [hasRegistered, setHasRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch logged in user state & check registration flag
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasRegistered(localStorage.getItem("hasRegistered") === "true");
    }

    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setDropdownOpen(false);
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="w-full bg-[#0B0E11] border-b border-gray-800 text-white font-sans selection:bg-[#39E11B]/30 relative z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo Brand */}
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

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.name === "Search") {
                return (
                  <button
                  type="button"
                    key={link.name}
                    onClick={() => setSearchOpen(true)}
                    className="text-base font-medium transition-colors duration-200 text-[#848E9C] hover:text-white focus:outline-none"
                  >
                    {link.name}
                  </button>
                );
              }

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

          {/* User Profile / Auth Action */}
          <div className="hidden md:flex items-center space-x-4">
            {!loading && (
              user ? (
                /* STATE 1: Logged in user -> Show avatar & dropdown */
                <div className="relative" ref={dropdownRef}>
                  <button
                  type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-3 p-1.5 rounded-full hover:bg-gray-800/60 transition-colors focus:outline-none"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#39E11B]/20 border border-[#39E11B] flex items-center justify-center text-[#39E11B] font-bold text-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <span className="text-sm font-medium text-gray-200">{user.name}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Profile Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#181A20] border border-gray-800 rounded-xl shadow-2xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-800">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="text-sm font-semibold text-white truncate">{user.email}</p>
                      </div>
                      <button
                      type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : hasRegistered ? (
                /* STATE 2: Logged out BUT registered user -> Show ONLY Log In */
                <Link
                  href="/login"
                  className="px-5 py-2 text-sm font-semibold text-black bg-[#39E11B] rounded-lg hover:bg-[#32cb17] transition-all duration-200 shadow-lg shadow-[#39E11B]/20"
                >
                  Log In
                </Link>
              ) : (
                /* STATE 3: First-time visitor -> Show BOTH buttons */
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-sm font-semibold text-black bg-[#39E11B] rounded-lg hover:bg-[#32cb17] transition-all duration-200 shadow-lg shadow-[#39E11B]/20"
                  >
                    Sign Up
                  </Link>
                </div>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[#848E9C] hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
}