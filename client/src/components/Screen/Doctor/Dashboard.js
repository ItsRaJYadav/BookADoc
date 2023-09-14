import React from 'react';
import { FaUser, FaRegCalendarCheck, FaChartPie, FaUserMd, FaEnvelope, FaRupeeSign } from 'react-icons/fa';

const DoctorDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">Doctor Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <FaUser className="text-4xl text-blue-500 mr-2" />
              <div>
                <h3 className="text-lg font-semibold">Profile</h3>
                <p className="text-gray-600">View and edit your profile</p>
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <FaRegCalendarCheck className="text-4xl text-blue-500 mr-2" />
              <div>
                <h3 className="text-lg font-semibold">Appointments</h3>
                <p className="text-gray-600">Manage your patient appointments</p>
              </div>
            </div>
          </div>

          {/* Patient  Card */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <FaUserMd className="text-4xl text-blue-500 mr-2" />
              <div>
                <h3 className="text-lg font-semibold">Patient Records</h3>
                <p className="text-gray-600">Access patient records and history</p>
              </div>
            </div>
          </div>

          {/* Recent Appointments Card */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <FaRegCalendarCheck className="text-4xl text-blue-500 mr-2" />
              <div>
                <h3 className="text-lg font-semibold">Recent Appointments</h3>
                <p className="text-gray-600">View your recent patient appointments</p>
              </div>
            </div>
          </div>

          {/* Patient Statistics Card */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <FaChartPie className="text-4xl text-blue-500 mr-2" />
              <div>
                <h3 className="text-lg font-semibold">Patient Statistics</h3>
                <p className="text-gray-600">Track patient statistics and trends</p>
              </div>
            </div>
          </div>

          {/* New Patient Card */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <FaUser className="text-4xl text-blue-500 mr-2" />
              <div>
                <h3 className="text-lg font-semibold">New Patient</h3>
                <p className="text-gray-600">Add a new patient record</p>
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <FaRegCalendarCheck className="text-4xl text-blue-500 mr-2" />
              <div>
                <h3 className="text-lg font-semibold">Appointments</h3>
                <p className="text-gray-600">Manage your patient appointments</p>
              </div>
            </div>
          </div>

          {/* Inbox Card */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <FaEnvelope className="text-4xl text-blue-500 mr-2" />
              <div>
                <h3 className="text-lg font-semibold">Inbox</h3>
                <p className="text-gray-600">View and respond to patient messages</p>
              </div>
            </div>
          </div>

          {/* Earnings Card */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <FaRupeeSign className="text-4xl text-blue-500 mr-2" />
              <div>
                <h3 className="text-lg font-semibold">Earnings</h3>
                <p className="text-gray-600">View your earnings and income</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">Total Earnings: Rs 5,000</p>
              <p className="text-gray-600">Earnings This Month: Rs 1,200</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

