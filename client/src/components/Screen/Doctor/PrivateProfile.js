import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPhone, FaEnvelope, FaGlobe, FaMapMarker, FaClock, FaDollarSign, FaUserMd, FaHospital, FaLanguage } from 'react-icons/fa';
import { useAuth } from '../../../contextApi/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../../Utils/Loader'

const DoctorDetails = () => {
    const [auth] = useAuth();
    const navigate = useNavigate();
    const doctorId = auth?.user.id;
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAvailable, setIsAvailable] = useState(false);


    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`/api/v1/doc/doctorInfo/${doctorId}`);
                console.log('Response data:', response.data);
                setData(response.data);
                setIsLoading(false);
                setIsAvailable(response.data.doctor.status);
            } catch (error) {
                setError(error.message || 'An error occurred while fetching data.');
                setIsLoading(false);
            }
        };

        fetchDoctorData();
    }, [doctorId]);


    const EditProfileHandle = () => {
        navigate(`/doctor/updateProfile/${doctorId}`)
    }


    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>data not found</div>;
    }

    const toggleAvailability = async () => {
        try {
            const newStatus = !isAvailable;
            await axios.patch(`/api/v1/doc/updateAvailability/${doctorId}`, { status: newStatus });
            setIsAvailable(newStatus);
            toast.success(`Updated availability`);
        } catch (error) {
            console.error('Error updating availability status:', error);
        }
    }

    return (

        <div className="bg-gray-100 min-h-screen p-4">
            <div className="bg-white rounded-lg shadow p-4">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/3 mb-4 md:mb-0 mr-5 flex flex-col items-center">
                        <img
                            src={data.doctor.avatar}
                            alt={data.doctor.Name}
                            className="w-full h-70 object-cover rounded-lg"
                        />
                        <button
                            onClick={EditProfileHandle}
                            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            Edit Profile
                        </button>
                    </div>

                    <div className="md:w-2/3">
                        <h2 className="text-2xl font-semibold text-center mr-14">{data.doctor.Name}</h2>
                        <p className="text-xl text-gray-600 mb-4">{data.doctor.specialization}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <FaPhone className="text-gray-500 mr-2" />
                                <span className="text-gray-600">{data.doctor.phone}</span>
                            </div>
                            <div className="flex items-center">
                                <FaEnvelope className="text-gray-500 mr-2" />
                                <span className="text-gray-600">{data.doctor.email}</span>
                            </div>
                            <div className="flex items-center">
                                <FaGlobe className="text-gray-500 mr-2" />
                                <a
                                    href={data.doctor.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    {data.doctor.website}
                                </a>
                            </div>
                            <div className="flex items-center">
                                <FaMapMarker className="text-gray-500 mr-2" />
                                <span className="text-gray-600">{data.doctor.address}</span>
                            </div>

                            <div className="flex items-center">
                                <FaDollarSign className="text-gray-500 mr-2" />
                                <span className="text-gray-600">
                                    Fee: {data.doctor.feesPerConsultation}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <FaUserMd className="text-gray-500 mr-2" />
                                <span className="text-gray-600">
                                    Qualifications: {data.doctor.qualifications}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <FaHospital className="text-gray-500 mr-2" />
                                <span className="text-gray-600">
                                    Hospital Affiliation: {data.doctor.hospitalAffiliation}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <FaLanguage className="text-gray-500 mr-2" />
                                <span className="text-gray-600">
                                    Languages Spoken: {data.doctor.languagesSpoken}
                                </span>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-4 flex justify-center">
                            <div>
                                <h3 className="text-2xl font-semibold">Timings</h3>
                                <div className="mt-4 space-y-2">
                                    {Array.isArray(data.doctor.timings) && data.doctor.timings.map((timing, index) => (
                                        <div key={index} className="mb-4">
                                            <div className="font-semibold">{timing.day}:</div>
                                            <div className="flex flex-wrap items-center mt-2">
                                                {timing.slots.map((slot, slotIndex) => (
                                                    <div key={slotIndex} className="flex items-center mr-4">
                                                        <FaClock className="text-gray-500 mr-2" />
                                                        <span className="text-gray-600">Slot {slotIndex + 1}: {slot}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <h2 className="text-xl font-semibold">Availability</h2>
                            <div className="flex items-center">
                                <span className={`text-lg font-bold mr-2 ${isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                                    {isAvailable ? 'Available' : 'Not Available'}
                                </span>
                                <button
                                    className={`px-4 py-2 text-white rounded-md  focus:ring-blue-300 ${isAvailable ? 'bg-red-500' : 'bg-green-500'}`}
                                    onClick={toggleAvailability}
                                >
                                    {isAvailable ? 'Make Not Available' : 'Make Available'}
                                </button>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-xl font-semibold">About</h3>
                            <p className="text-gray-600">{data?.doctor?.about}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default DoctorDetails;
