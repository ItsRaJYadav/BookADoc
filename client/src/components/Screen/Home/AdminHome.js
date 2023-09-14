import React from "react";
import { FaUsers, FaChartBar, FaCog } from "react-icons/fa";

function AdminHome() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Home Page</h1>
      <div className="flex space-x-8">
        <div className="flex flex-col items-center">
          <FaUsers className="text-6xl text-blue-500 mb-2" />
          <span>Users</span>
        </div>
        <div className="flex flex-col items-center">
          <FaChartBar className="text-6xl text-green-500 mb-2" />
          <span>Analytics</span>
        </div>
        <div className="flex flex-col items-center">
          <FaCog className="text-6xl text-purple-500 mb-2" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
