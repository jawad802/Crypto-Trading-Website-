"use client";

import React, { useState } from "react";
// Import the popup card from the components folder kitchen!
import SearchBar from "@/components/search/SearchBar";

export default function SearchPageRoute() {
  // Keep the overlay open automatically when someone visits this URL route
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center p-4 text-slate-900 font-sans">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-slate-900">Search Workspace Terminal</h1>
        <p className="text-slate-500 text-sm mb-6">
          The Search bar overlay can be triggered directly using the button below or by using Navbar controls.
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-medium px-5 py-2.5 rounded-xl transition shadow-sm"
        >
          Open Search Panel
        </button>
      </div>

      {/* Render the reusable visual card here */}
      <SearchBar isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}