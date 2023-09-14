import React from 'react';
import { RiLock2Fill } from 'react-icons/ri';

const AccessDeniedPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img src='https://pbs.twimg.com/media/Fw06xcMaAAAYosm?format=jpg&name=large' alt="Access Denied" className="w-48 h-48 mb-4" />
            <RiLock2Fill className="text-6xl text-red-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-xl text-gray-700">You must be an admin to access this page.</p>
        </div>
    );
};

export default AccessDeniedPage;

