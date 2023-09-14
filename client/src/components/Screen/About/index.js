import React from 'react';
import { FaUserMd, FaStethoscope, FaCalendarCheck } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-8">
          <img
            src="https://entranttechnologies.com/img/doctor_appointment_app_img.png" 
            alt="App Image"
            className="w-48 h-48 mx-auto rounded-full border-4 border-blue-500"
          />
          <h1 className="text-3xl font-bold mt-4">About Our Doctor Appointment App</h1>
        </div>
        <p className="text-lg mb-4">
          Welcome to our doctor appointment app! We are dedicated to making it easy for you to find and book appointments with healthcare professionals.
        </p>
        <p className="text-lg mb-4">
          Our mission is to connect patients with the right doctors and provide a seamless and convenient experience for scheduling appointments.
        </p>
        <div className="text-lg mb-4">
          <strong>Key Features:</strong>
          <ul className="list-disc pl-6 mt-2">
            <li className="mb-2 flex items-center">
              <FaUserMd className="text-blue-500 mr-2" />
              Expert Doctors
            </li>
            <li className="mb-2 flex items-center">
              <FaStethoscope className="text-blue-500 mr-2" />
              Access to Healthcare
            </li>
            <li className="mb-2 flex items-center">
              <FaCalendarCheck className="text-blue-500 mr-2" />
              Easy Appointments
            </li>
          </ul>
        </div>
        <p className="text-lg mb-4">
          Feel free to explore our app and discover how we can help you manage your healthcare needs.
        </p>
      </div>
    </div>
  );
};

export default About;
