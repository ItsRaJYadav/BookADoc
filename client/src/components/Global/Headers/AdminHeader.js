import React, { useState } from 'react';
import logo from '../../assets/images.png'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiX, FiMenu } from 'react-icons/fi';
import { HiHome } from 'react-icons/hi';
import { SiAboutdotme } from 'react-icons/si';
import { PiTextTThin } from 'react-icons/pi';
import { FcAbout } from 'react-icons/fc';


const Header = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className="bg-gray-200 text-gray-900">
            <nav className="container mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-between">

                    <NavLink to='/' className="flex items-center" >
                        <img
                            src={logo}
                            className="h-6 mr-3 sm:h-9 w-6 sm:w-9"
                            alt=" Logo"


                        />
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
                    <li>
                        <Link
                            to="/admin"
                            className={`py-2 pl-3 pr-4 flex items-center text-gray-900 rounded cursor-pointer ${location.pathname === '/admin' ? 'bg-blue-200' : ''
                                }`}
                        >
                            <FcAbout className="mr-2" />
                            AdminDashboard
                        </Link>
                    </li>
                    
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

                        <div className="flex">
                            <PiTextTThin className="text-4xl text-blue-600 flex justify-center items-center ml-9" />
                            <PiTextTThin className="text-4xl text-blue-600 flex justify-center items-center  mr-3" />
                        </div>



                        <li className="flex items-center">
                            <HiHome size={18} className="mr-5" />
                            <Link to="/" onClick={closeMobileMenu}>Home</Link>
                        </li>

                        
                        <li className="flex items-center">
                            <SiAboutdotme size={18} className="mr-5" />
                            <Link to="/admin" onClick={closeMobileMenu}>Admin Dashboard</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;