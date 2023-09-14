import React from 'react';
import {  FaCalendar, FaRegNewspaper, FaInbox, FaCheckCircle } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contextApi/auth';

const UserDashboard = () => {
  const [authUser]=useAuth();
  const navigate= useNavigate();
  const userRole = authUser?.user?.isDoctor || authUser?.user?.isAdmin;
  
  if (userRole) {
    return navigate('/');
  }
  const user = {
    name: 'Raj Yadav',
    appointments: [
      { id: 1, date: '2023-09-15', time: '10:00 AM', doctor: 'Dr. raj' },
      { id: 2, date: '2023-09-20', time: '2:30 PM', doctor: 'Dr. Raj' },
    ],
    subscriptions: [
      { id: 1, name: 'Gold Plan', expires: '2023-12-31' },
      { id: 2, name: 'Premuim Plan', expires: '2023-12-31' },
    ],
    inboxMessages: [
      { id: 1, sender: 'Admin', subject: 'Welcome!', date: '2023-09-01' },
    ],
    previousRecords: [
      { id: 1, date: '2023-08-15', diagnosis: 'Fever' },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold mb-6 text-center">User Dashboard</h1>

        <div className="flex flex-wrap -mx-4">
          {/* Appointments */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">
                <FaCalendar className="inline-block mr-2 text-blue-500" />
                Appointments
              </h2>
              {user.appointments.map((appointment) => (
                <div key={appointment.id} className="mb-2">
                  <p>Date: {appointment.date}</p>
                  <p>Time: {appointment.time}</p>
                  <p>Doctor: {appointment.doctor}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subscriptions */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">
                <FaRegNewspaper className="inline-block mr-2 text-green-500" />
                Subscriptions
              </h2>
              {user.subscriptions.map((subscription) => (
                <div key={subscription.id} className="mb-2">
                  <p>Name: {subscription.name}</p>
                  <p>Expires: {subscription.expires}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Inbox Messages */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">
                <FaInbox className="inline-block mr-2 text-orange-500" />
                Inbox Messages
              </h2>
              {user.inboxMessages.map((message) => (
                <div key={message.id} className="mb-2">
                  <p>From: {message.sender}</p>
                  <p>Subject: {message.subject}</p>
                  <p>Date: {message.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Previous Records */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">
                <FaCheckCircle className="inline-block mr-2 text-red-500" />
                Previous Records
              </h2>
              {user.previousRecords.map((record) => (
                <div key={record.id} className="mb-2">
                  <p>Date: {record.date}</p>
                  <p>Diagnosis: {record.diagnosis}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
