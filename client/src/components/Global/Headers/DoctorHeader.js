import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
       
        <div className="text-white text-xl font-bold">
          BookADoc
        </div>

        
        <nav className="space-x-4">
          <Link
            to='/'
            className="text-white hover:text-blue-200 transition duration-300"
          >
            Home
          </Link>
          <Link
            to='/doctor/dashboard'
            className="text-white hover:text-blue-200 transition duration-300"
          >
            DashBoard
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
