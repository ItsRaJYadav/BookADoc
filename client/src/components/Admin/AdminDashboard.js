import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FiUsers, FiLogOut } from 'react-icons/fi';
import { MdNotificationsActive } from 'react-icons/md';
import { useAuth } from '../../contextApi/auth';

const navigationLinks = [
  { name: 'Users', to: '/admin/alluser', icon: FiUsers },
  { name: 'All Doctors', to: '/admin/doctorslist', icon: FiUsers },
  { name: 'Settings', to: '/admin/notifications', icon: MdNotificationsActive },
 
];

const AdminSidebar = () => {
  const [, ,Logout]=useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Logout();
    navigate('/');
  };

  return (
    
    <div className="flex h-screen">
      <header className="bg-gray-200 w-64 px-4 py-8">
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/admin" className="flex items-center justify-center py-3 px-6 rounded-lg text-gray-700 hover:bg-gray-300">
                <span className="text-lg font-bold text-gray-900">Admin Dashboard</span>
              </Link>
            </li>
            <img src='https://rajydv.vercel.app/static/media/Hero.540fddaef6975d508300.webp' alt="Logo" />
            <hr />
            {navigationLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.to}
                  className={`flex items-center justify-center py-3 px-6 rounded-lg text-gray-700 hover:bg-gray-300`}
                >
                  {React.createElement(link.icon, { className: 'mr-2' })}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className={`flex items-center justify-center py-3 px-6 rounded-lg text-gray-700 hover:bg-gray-300`}
              >
                <FiLogOut className="ml-2" />
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <div className="flex-1 bg-white p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminSidebar;
