"use client";

import React, { useState } from "react";
// Import the popup card from the components folder kitchen!
import SearchBar from "@/components/search/SearchBar";

export default function SearchPageRoute() {
  // Keep the overlay open automatically when someone visits this URL route
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#0B0E11] flex flex-col items-center justify-center text-center p-4 text-white font-sans">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-gray-100">Search Workspace Terminal</h1>
        <p className="text-gray-400 text-sm mb-6">
          The Search bar overlay can be triggered directly using the button below or by using Navbar controls.
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-gray-800 hover:bg-gray-700 border border-gray-700/60 text-white font-medium px-5 py-2.5 rounded-xl transition shadow-md"
        >
          Open Search Panel
        </button>
      </div>

      {/* Render the reusable visual card here */}
      <SearchBar isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}