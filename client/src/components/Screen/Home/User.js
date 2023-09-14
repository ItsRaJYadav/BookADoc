import React from 'react';
import { FaStethoscope } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import doctorImage from '../../assets/doctor.avif';

const HomeHero = () => {
  return (
    <>
    <div className="bg-blue-500 py-24 text-white text-center">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">Find Your Doctor Online</h1>
        <p className="text-lg mb-8">Book appointments with ease and convenience.</p>
        <Link
          to="/alldoctors" 
          className="bg-white text-blue-500 hover:bg-blue-300 hover:text-gray-900 text-lg font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Book an Appointment
        </Link>
        <div className="mt-12">
          <img
            src={doctorImage}
            alt="Doctor"
            className="w-64 mx-auto rounded-full shadow-lg"
          />
        </div>
        <div className="mt-8">
          <FaStethoscope className="text-6xl mx-auto" />
        </div>
      </div>
      
    </div>
    
    </>
  );
};

export default HomeHero;
