"use client";
import React from "react";

const TeamPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-10">
      <h1 className="text-5xl font-bold mb-6">Meet the RocketHacks Team</h1>
      <p className="text-lg mb-4">Welcome to our team page! Meet the brilliant minds behind RocketHacks.</p>
      
      {/* Team Member Cards (Add More Members Here) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold">John Doe</h2>
          <p className="text-sm text-gray-400">Lead Developer</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold">Jane Smith</h2>
          <p className="text-sm text-gray-400">UI/UX Designer</p>
        </div>
      </div>
    </main>
  );
};

export default TeamPage;
