import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../contextApi/auth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const AppointmentDetails = () => {
  const [authUser] = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = authUser?.user.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/appoint/AllAppointsByDocId/${userId}`);
        setAppointments(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const currentDate = new Date(); // Get the current date

  const upcomingAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate >= currentDate;
  });

  const pastAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate < currentDate;
  });


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
  


  const approveAppointment = async (appointmentId) => {
    const url = `/api/v1/appoint/approve/${appointmentId}`;
  
    try {
      const result = await Swal.fire({
        title: 'Approve Appointment?',
        text: `Are you sure you want to approve the appointment with ID ${appointmentId}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, approve it!',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
      });
  
      if (result.isConfirmed) {
        const response = await axios.patch(url);
  
        if (response.status === 200) {
          setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
              appointment.id === appointmentId
                ? { ...appointment, status: 'approved' }
                : appointment
            )
          );
          Swal.fire({
            title: 'Approved!',
            text: `Appointment with ID ${appointmentId} has been approved.`,
            icon: 'success',
          });
        }
      }
    } catch (error) {
      console.error('Error approving appointment:', error);
      toast.error('Error approving appointment.');
    }
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
                 <p className="text-xl font-semibold">Patient Name: {appointment.patientName}</p>
                  <p className="text-lg ">Patient age: {appointment.age}</p>
                  <p className="text-lg ">Phone: {appointment.phone}</p>
                  <p className="text-lg">Date: {appointment.date}</p>
                  <p className="text-lg">Time: {appointment.time}</p>
                  <p className="text-lg">Subject: {appointment.subject}</p>
                  <p className="text-gray-600 font-bold ">Status: {appointment.status}</p>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => approveAppointment(appointment.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600"
                    >
                      Approve 
                    </button>
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
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
                  <p className="text-xl font-semibold">Patient Name: {appointment.patientName}</p>
                  <p className="text-lg ">Patient age: {appointment.age}</p>
                  <p className="text-lg ">Phone: {appointment.phone}</p>
                  <p className="text-lg">Date: {appointment.date}</p>
                  <p className="text-lg">Time: {appointment.time}</p>
                  <p className="text-lg">Subject: {appointment.subject}</p>
                  <p className="text-gray-600 font-bold ">Status: {appointment.status}</p>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => approveAppointment(appointment.id)}
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
                  </div>
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
