import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-400">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="flex items-center justify-center mb-4">
          <FaCheckCircle className="text-green-500 text-6xl" />
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Appointment Successfully Booked!
        </h1>
        <p className="text-lg text-gray-600">
          Your appointment has been confirmed. We look forward to seeing you!
        </p>
        <Link to ='/user/appointments'>
        <button className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 mt">
          Back to Dashboard
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
