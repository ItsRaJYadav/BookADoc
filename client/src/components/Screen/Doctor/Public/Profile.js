import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaGlobe, FaMapMarker, FaClock, FaUserMd, FaHospital, FaLanguage, FaRupeeSign } from 'react-icons/fa';
import ShowALlReview from './ShowAllReview'
import WriteAReview from './DoctorReview'

const DoctorDetails = () => {
    const history = useNavigate();

    const { doctorId } = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`/api/v1/doc/doctorInfo/${doctorId}`);
                // console.log('Response data:', response.data);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message || 'An error occurred while fetching data.');
                setIsLoading(false);
            }
        };

        fetchDoctorData();
    }, [doctorId]);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>data not found</div>;
    }

    const HandleBookAppointment = () => {
        history(`/booking_appointment/${data.doctor.id}`, {
            state: {
                name: data.doctor.Name,
                email: data.doctor.email,
                fee: data.doctor.feesPerConsultation
            }
        });
    }


    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="bg-white rounded-lg shadow p-4">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/3 mb-4 md:mb-0">
                        <img
                            src={data.doctor.avatar}
                            alt={data.doctor.Name}
                            className="w-full h-70 object-cover rounded-lg"
                        />
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
                                <FaRupeeSign className="text-gray-500 mr-2" />
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
                        <div className="mt-5">
                            <h2 className="text-xl font-semibold">Timing</h2>
                            <div className="flex items-center mt-2">
                                <FaClock className="text-gray-500 mr-2" />
                                {data.doctor.timings.toString()}
                            </div>
                        </div>


                        <div className="mt-6">
                            <h3 className="text-xl font-semibold">About</h3>
                            {data?.doctor?.about}
                        </div>
                        <button
                            onClick={HandleBookAppointment}

                            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            Book Appointment
                        </button>

                    </div>
                </div>

            </div>
            <WriteAReview doctorId={doctorId} />
            <ShowALlReview doctorId={doctorId} />
        </div>


    );
};

export default DoctorDetails;
