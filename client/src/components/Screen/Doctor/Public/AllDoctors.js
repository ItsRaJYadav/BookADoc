import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle, FaRupeeSign } from 'react-icons/fa';
import { useAuth } from '../../../../contextApi/auth';
import Footer from '../../../Global/Footer';



const AllDoctorDetails = (props) => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [authUser] = useAuth();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/doc/getVerifiedDoctors');
        setData(response.data.doctors);
        setIsLoading(false);
      } catch (error) {
        setError(error.message || 'An error occurred');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);



  const HandleBooking = (doctor) => {
    navigate(`/booking_appointment/${doctor.id}`,
      { state: {name: doctor.Name, email: doctor.email, fee: doctor.feesPerConsultation } });
  }



  return (

    <>
      <div className="bg-gray-100 min-h-screen px-8 p-5">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          All available doctors details
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search doctors by name, specialization, or address"
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data
            .filter((doctor) =>
              doctor.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
              doctor.address.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-between">
                  <div className="w-1/3 relative">
                    <img
                      src={doctor.avatar}
                      alt={doctor.Name}
                      className="w-full h-auto object-cover rounded-full"
                    />
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-semibold rounded-full p-1 flex items-center">
                      <FaCheckCircle className="mr-1" />
                      Verified
                    </div>
                    <p className="text-center mt-2">
                      <Link to={`/doctor-profile/${doctor.id}`} className="text-blue-500 hover:underline">
                        View Profile
                      </Link>
                    </p>
                  </div>

                  <div className="w-2/3 pl-4">
                    <h2 className="text-lg font-semibold">{doctor.Name}</h2>
                    <p className="text-gray-600">Specialization in {doctor.specialization}</p>
                    <div className="flex items-center text-gray-600 mt-2">
                      <span className="mr-2">Fee:</span>
                      <span>
                        <FaRupeeSign />
                      </span>
                      <span>{doctor.feesPerConsultation}</span>
                    </div>
                    <p className="text-gray-600 mt-2">Address: {doctor.address}</p>
                    <p className="text-gray-600">Review : </p>
                    <p
                      className={`text-${doctor.status === 'active' ? 'green' : 'red'
                        }-600 mt-2`}
                    >
                      Status: {doctor.status}
                    </p>
                    <button
                      onClick={() => HandleBooking(doctor)}

                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300"

                    >
                      Book Appointment
                    </button>



                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllDoctorDetails;

