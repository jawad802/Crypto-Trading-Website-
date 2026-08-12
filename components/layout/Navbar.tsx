"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, ChevronDown, Bookmark } from "lucide-react";
import SearchBar from "@/components/search/SearchBar";

// 1. Added Watchlist link to main navigation array
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Search", href: "#" },
  { name: "Tokens", href: "/tokens" },
  { name: "Watchlist", href: "/watchlist" },
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
    <nav className="w-full bg-slate-50 border-b border-slate-200 text-slate-900 font-sans relative z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#CC5500] bg-transparent">
              <svg
                className="w-6 h-6 text-[#CC5500]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-2xl font-medium tracking-tight text-slate-900">
              Coin<span className="font-medium text-slate-900">Pulse</span>
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
                    className="text-base font-medium transition-colors duration-200 text-slate-800 hover:text-slate-900 focus:outline-none"
                  >
                    {link.name}
                  </button>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-lg font-medium transition-colors duration-200 hover:text-[#E35335] ${isActive ? "text-[#EC5800] font-semibold" : "text-slate-800"
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
                    className="flex items-center space-x-3 p-1.5 rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#EC5800] flex items-center justify-center text-white font-bold text-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <span className="text-lg font-medium text-slate-900">{user.name}</span>
                    <ChevronDown className={`w-6 h-6 text-slate-600 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Profile Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-slate-200">
                        <p className="text-xs text-slate-500">Signed in as</p>
                        <p className="text-sm font-semibold text-slate-900 truncate">{user.email}</p>
                      </div>

                      {/* 2. Added Watchlist Link in User Dropdown */}
                      <Link
                        href="/watchlist"
                        onClick={() => setDropdownOpen(false)}
                        className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 transition-colors border-b border-slate-100"
                      >
                        <Bookmark className="w-4 h-4 text-emerald-600" />
                        <span>My Watchlist</span>
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
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
                  className="px-5 py-2 text-base font-semibold text-white bg-[#EC5800] rounded-md  transition-all duration-200 shadow-sm"
                >
                  Log In
                </Link>
              ) : (
                /* STATE 3: First-time visitor -> Show BOTH buttons */
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-base font-medium text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-base font-semibold text-white bg-[#EC5800] rounded-md  transition-all duration-200 shadow-sm"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 pb-6 border-t border-slate-200 bg-slate-50">
          <div className="space-y-4 pt-4">
            {navLinks.map((link) =>
              link.name === "Search" ? (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => {
                    setSearchOpen(true);
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-base font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-base font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  {link.name}
                </Link>
              )
            )}

            <div className="pt-4 border-t border-slate-200">
              {!loading ? (
                user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center text-[#10B981] font-bold text-sm">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/watchlist"
                      onClick={() => setIsOpen(false)}
                      className="block w-full rounded-lg px-4 py-3 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                    >
                      My Watchlist
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="w-full rounded-lg px-4 py-3 text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 transition"
                    >
                      Log Out
                    </button>
                  </div>
                ) : hasRegistered ? (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full rounded-lg px-4 py-3 text-sm font-semibold text-white bg-[#EC5800] hover:bg-[#d44d00] transition"
                  >
                    Log In
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full rounded-lg px-4 py-3 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="block w-full rounded-lg px-4 py-3 text-sm font-semibold text-black bg-[#10B981] hover:bg-[#0f9b58] transition"
                    >
                      Sign Up
                    </Link>
                  </div>
                )
              ) : (
                <div className="text-sm text-slate-500">Loading...</div>
              )}
            </div>
          </div>
        </div>
      )}

      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
}