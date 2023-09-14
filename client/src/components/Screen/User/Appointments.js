
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../contextApi/auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import WriteReview from '../Doctor/Public/DoctorReview';

const AppointmentDetails = () => {
  const [authUser] = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null); 
  const userId = authUser?.user.id;
  const navigate = useNavigate();
  const userRole = authUser?.user?.isDoctor || authUser?.user?.isAdmin;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/appoint/userAppointsById/${userId}`);
        setAppointments(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (userRole) {
    return navigate('/');
  }

  const currentDate = new Date();

  const upcomingAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate >= currentDate;
  });

  const pastAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate < currentDate;
  });

  const handleEditAppointment = (appointmentId) => {
    navigate(`/user/appointments/edit/${appointmentId}`);
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this appointment!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const response = await axios.delete(`/api/v1/appoint/delete/${appointmentId}`);

        if (response.status === 204) {
          setAppointments((prevAppointments) =>
            prevAppointments.filter((appointment) => appointment.id !== appointmentId)
          );

          Swal.fire({
            title: 'Deleted!',
            text: 'Appointment deleted successfully',
            icon: 'success',
          });
        }
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const writeReview = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold mb-6">Appointment Details</h1>

        <div className="mb-4">
          {/* Tab Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`${activeTab === 'upcoming'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-700'
              } px-4 py-2 rounded-lg focus:outline-none transition duration-300 hover:bg-blue-600`}
            >
              Upcoming Appointments
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`${activeTab === 'past' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              } px-4 py-2 rounded-lg focus:outline-none transition duration-300 hover:bg-blue-600`}
            >
              Past Appointments
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : activeTab === 'upcoming' ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 mb-4 bg-gray-50 rounded-lg hover:shadow-md transition duration-300"
                >
                  <p className="text-xl font-semibold">Doctor: {appointment.doctorName}</p>
                  <p className="text-gray-600">Date: {appointment.date}</p>
                  <p className="text-gray-600">Time: {appointment.time}</p>
                  <p className="text-gray-600">Subject: {appointment.subject}</p>
                  <p className="text-gray-600">Status: {appointment.status}</p>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => handleEditAppointment(appointment.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-red-600"
                    >
                      Delete
                    </button>

                    {/* Button to open the review form*/}
                    <button
                      onClick={() => writeReview(appointment.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600"
                    >
                      Write a Review
                    </button>
                  </div>

                  {/* Render the WriteReview component */}
                  {selectedAppointmentId === appointment.id && (
                    <WriteReview className='bg-black' doctorId={appointment.doctorId} onClose={() => setSelectedAppointmentId(null)} />
                  )}
                </div>
              ))}
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
              {pastAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 mb-4 bg-gray-50 rounded-lg hover:shadow-md transition duration-300"
                >
                  <p className="text-xl font-semibold">Doctor: {appointment.doctor}</p>
                  <p className="text-gray-600">Date: {appointment.date}</p>
                  <p className="text-gray-600">Time: {appointment.time}</p>
                  <p className="text-gray-600">Doctor Name: {appointment.address}</p>
                  <p className="text-gray-600">Subject: {appointment.subject}</p>
                  <p className="text-gray-600">Status: {appointment.status}</p>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => handleEditAppointment(appointment.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-red-600"
                    >
                      Delete
                    </button>

                    {/* Button to open the review form */}
                    <button
                      onClick={() => writeReview(appointment.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600"
                    >
                      Write a Review
                    </button>
                  </div>

                  {/* Render the WriteReview component */}
                  {selectedAppointmentId === appointment.id && (
                    <WriteReview className='bg-black' doctorId={appointment.doctorId} onClose={() => setSelectedAppointmentId(null)} />
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;

