import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DoctorRegistrationForm = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    Name: '',
    password: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    specialization: '',
    experience: '',
    feesPerConsultation: '',
    timings: '',
    gender: 'male',
    status: 'Not Available',
    qualifications: '',
    registrationNumber: '',
    hospitalAffiliation: '',
    languagesSpoken: [],
    about:""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLanguagesChange = (e) => {
    const selectedLanguages = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      languagesSpoken: selectedLanguages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
  
    try {
      const response = await axios.post('/api/v1/doc/doctor-registration', formData);
  
      if (response.status === 201) {
        toast.success('Doctor registration successful');
        navigator('/login')
      } else {
        toast.error('Doctor registration failed');
      }
    } catch (error) {
      console.error('An error occurred while registering the doctor:', error);
  
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };
  
  
  

  return (
    <>
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-center">Doctor Registration</h1>
      <form onSubmit={handleSubmit}>
        {/* User ID */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">UserName</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            placeholder='Choose a username for login'
          />
        </div>
       

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            placeholder='Dr Aryan Yadav'
          />
        </div>

       
        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            placeholder='enter your phone number'
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            placeholder='enter your email address'
          />
        </div>

         {/* Password */}
         <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            placeholder='choose a strong password'
          />
        </div>


        {/* Website */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Website (Optional)</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleInputChange}

            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder='add your website like http://example.com'
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            placeholder='enter your full address along with pin code'
          />
        </div>

        {/* Specialization */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            placeholder='tell about your specialization'
          />
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Experience</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            placeholder='enter your total experience in years'
          />
        </div>

        {/* Fees Per Consultation */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Fees Per Consultation</label>
          <input
            type="number"
            name="feesPerConsultation"
            value={formData.feesPerConsultation}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            placeholder='fees per Consultation in rupees'
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="Not Available">Not Available</option>
            <option value="Avaliable">Available</option>
            
          </select>
        </div>

        {/* Timings */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Timings</label>
          <input
            type="text"
            name="timings"
            value={formData.timings}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            placeholder='add appropriate time like monday: 9:00 AM - 5:00 PM,
            tuesday: 9:00 AM - 5:00 PM'
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Qualifications */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Qualifications</label>
          <input
            type="text"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            placeholder='enter your qualifications'
          />
        </div>

        {/* Registration Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Registration Number</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            placeholder='enter your registration number'
          />
        </div>

         {/* About */}
         <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">About Section </label>
          <input
            type="text"
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            placeholder='enter your registration number'
          />
        </div>

        {/* Hospital Affiliation */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
          <input
            type="text"
            name="hospitalAffiliation"
            value={formData.hospitalAffiliation}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder='enter your hospital name and affiliation'
          />
        </div>

        {/* Languages Spoken */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Languages Spoken</label>
          <select
            name="languagesSpoken"
            multiple
            value={formData.languagesSpoken}
            onChange={handleLanguagesChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="english">English</option>
            <option value="spanish">Hindi</option>
            <option value="french">Marathi</option>
            <option value="german">Maithili</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded mr-2"
          >
            <FaCheck className="inline mr-1" /> Register
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
          >
            <FaTimes className="inline mr-1" /> Cancel
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default DoctorRegistrationForm;
