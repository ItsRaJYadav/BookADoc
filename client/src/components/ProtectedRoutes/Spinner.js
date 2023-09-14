import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSpinner } from 'react-icons/fa';

const Spinner = () => {
  const [count, setCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate("/login", {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location]);
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-center">Redirecting to you in {count} second(s)</h1>
        <div className="spinner mt-4">
          <FaSpinner className="spinner-icon animate-spin text-blue-500 text-4xl" />
        </div>
      </div>
    </>
  );
};

export default Spinner;