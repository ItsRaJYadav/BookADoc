import React from 'react';

const VideoConsultancyInProgress = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-400">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          We are currently working on the Video Consultancy service
        </h1>
        <p className="text-lg text-gray-600">
          Thank you for your patience. We'll be launching our Video Consultancy service soon.
        </p>
      </div>
    </div>
  );
};

export default VideoConsultancyInProgress;
