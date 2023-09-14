import React from "react";
import { Link, useLocation } from "react-router-dom";

function ErrorPage() {
  const location = useLocation();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
        <p className="text-lg text-gray-600">We apologize for the inconvenience.</p>
        <p className="text-lg text-gray-600 mt-5">
          Error Location: {location.pathname}
        </p>
        <p className="text-lg text-gray-600">
          Error Message: <span className="text-red-500">Page not found.</span>
        </p>
        <Link
          to="/"
          className="mt-8 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
