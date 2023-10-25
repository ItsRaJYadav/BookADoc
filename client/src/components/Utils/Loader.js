import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin">
        <FaSpinner className="text-4xl text-blue-500" />
      </div>
    </div>
  );
};

export default Loader;
