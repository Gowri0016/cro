import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-purple-600 to-blue-500 py-8 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-center px-6 md:px-12">
        {/* Brand Section */}
        <h1 className="text-2xl font-extrabold tracking-wide">Crowdfund</h1>
        
    
        
        {/* Copyright Section */}
        <p className="text-sm mt-4 md:mt-0">&copy; {new Date().getFullYear()} Crowdfunding Platform. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
