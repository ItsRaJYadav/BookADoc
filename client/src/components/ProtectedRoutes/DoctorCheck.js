import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contextApi/auth";
import axios from "axios";
import Spinner from "./Spinner";
import AccessDeniedPage from "./AccessDenied";

const DoctorCheck = ({ children }) => {
  const [isDoctor, setIsDoctor] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  useEffect(() => {
    const checkDoctorStatus = async () => {
      try {
        const response = await axios.get("/api/v1/doc/doctor-auth");
        setIsDoctor(response.data.ok);
      } catch (error) {
        setIsDoctor(false);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) {
      checkDoctorStatus();
    }
  }, [auth?.token]);

  useEffect(() => {
    if (!isDoctor && !loading) {
      setShowAccessDenied(true);
      const redirectTimer = setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => clearTimeout(redirectTimer);
    }
  }, [isDoctor, loading, navigate]);

  if (!auth?.token) {
    return <Spinner />;
  }

  if (showAccessDenied) {
    return <AccessDeniedPage />;
  }

  if (!isDoctor || loading) {
    return <Spinner />;
  }

  return children;
};

export default DoctorCheck;
