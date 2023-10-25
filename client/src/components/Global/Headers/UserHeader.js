import React, { useState } from 'react';
// import logo from '../../assets/mainlogo.png'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiX, FiMenu } from 'react-icons/fi';
import { HiHome, HiUserCircle } from 'react-icons/hi';
import { SiAboutdotme, SiIconfinder } from 'react-icons/si';
import { MdMedicalServices } from 'react-icons/md';
import { GiPriceTag } from 'react-icons/gi';
import { RiServiceLine } from 'react-icons/ri';
import { MdOutlineContactPhone, MdLogin } from 'react-icons/md';
import { useAuth } from '../../../contextApi/auth';


const Header = () => {
  const [auth] = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/alldoctors', text: 'Find A Doctor' },
    { to: '/video_consultancy', text: 'Video Consultancy' },
    { to: '/pricing', text: 'Pricing' },
    { to: '/services', text: 'Services' },
    auth?.user && { to: '/user', text: 'Profile' },
    !auth?.user && { to: '/login', text: 'Login / Sign up' },
    { to: '/about', text: 'About Us' },
    { to: '/contacts', text: 'Contacts' },
  ].filter(Boolean);


  return (
    <header className="bg-blue-100 text-gray-900">
      <nav className="container mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-between">

          <NavLink to='/' className="flex items-center" >
            {/* <img
              src={logo}
              className="h-6 mr-3 sm:h-9 w-6 sm:w-9"
              alt=" Logo"


            /> */}
            <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-900">
              BookADoc
            </span>
          </NavLink>
          <div className="md:hidden ml-24">
            <button
              className="text-gray-900 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
            </button>
          </div>
        </div>



        <ul className="hidden md:flex space-x-4 mt-4 md:mt-0 mx-auto text-lg border-gray-100 rounded-lg">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.to}
                className={`py-2 pl-3 pr-4 flex items-center text-gray-900 rounded cursor-pointer ${location.pathname === link.to ? ' border-b-2 border-blue-600' : ''
                  }`}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>



        {/* mobileMenu code off canvas */}

        {isMobileMenuOpen && (
          <div className={`fixed top-0 left-0 w-full h-full bg-black z-40 backdrop-filter backdrop-blur-lg bg-opacity-70`} />

        )}

        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gray-200 transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } z-50`}
        >
          <button
            className="text-gray-900 absolute top-4 right-4 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <FiX size={35} />
          </button>
          {/* off canvas */}
          <ul className="flex flex-col items-start space-y-4  p-4">

            <li className="flex items-center mt-10">
              <HiHome size={18} className="mr-5" />
              <Link to="/" onClick={closeMobileMenu}>Home</Link>
            </li>
            <li className="flex items-center">
              <MdMedicalServices size={18} className="mr-5" />
              <Link to="/alldoctors" onClick={closeMobileMenu}>Find A Doctor</Link>
            </li>
            <li className="flex items-center">
              <MdMedicalServices size={18} className="mr-5" />
              <Link to="/video_consultancy" onClick={closeMobileMenu}>video Consultancy</Link>
            </li>
            <li className="flex items-center">
              <GiPriceTag size={18} className="mr-5" />
              <Link to="/pricing" onClick={closeMobileMenu}>Pricing</Link>
            </li>
            <li className="flex items-center">
              <RiServiceLine size={18} className="mr-5" />
              <Link to="/services" onClick={closeMobileMenu}>Services</Link>
            </li>
            {auth?.user ? (
              <>
                <li className="flex items-center">
                  <HiUserCircle size={25} className="mr-2" />

                  <Link
                    to="/user"
                    className="pl-3 pr-4 text-gray-900 rounded cursor-pointer " onClick={closeMobileMenu}
                  >
                    {auth?.user.name && (
                      <p> Hello, {" "}
                        {auth.user.name.length > 10
                          ? `${auth.user.name.slice(0, 15)}...`
                          : auth.user.name}
                      </p>
                    )}
                  </Link>
                </li>

              </>
            ) : (
              <>
                <li className="flex items-center">
                  <MdLogin size={18} className="mr-2" />

                  <Link
                    to="/login"
                    className=" pl-3 pr-4 text-gray-900 rounded cursor-pointer " onClick={closeMobileMenu}

                  >
                    Login/Sign Up
                  </Link>
                </li>
              </>
            )}
            <li className="flex items-center">
              <SiAboutdotme size={18} className="mr-5" />
              <Link to="/about" onClick={closeMobileMenu}>About</Link>
            </li>
            <li className="flex items-center">
              <MdOutlineContactPhone size={18} className="mr-5" />
              <Link to="/contacts" onClick={closeMobileMenu}>Contact</Link>
            </li>

          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;