import React from 'react';
import Navbar from './../Navbar'; // Adjust the path based on your actual structure
import Header from './../Header'; // Import your Header component

const Main = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 p-1 overflow-y-auto">
        <div className="container mx-auto mt-16 mb-16">
          {/* Content Container */}
          <div className="bg-gray-200 rounded-lg shadow-md p-1 md:p-2">
            {/* Main Content */}
            {children}
          </div>
        </div>
      </main>

      {/* Navbar */}
      <Navbar />
    </div>
  );
};

export default Main;
