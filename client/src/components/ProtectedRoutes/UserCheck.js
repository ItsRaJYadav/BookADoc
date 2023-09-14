import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contextApi/auth";
import axios from "axios";
import Spinner from "./Spinner";
import toast from "react-hot-toast";


const UserAuthorization = ({ children }) => {
  const [isUserAuthorized, setIsUserAuthorized] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserAuthorization = async () => {
      try {
        const response = await axios.get("/api/v1/auth/user-auth");
        setIsUserAuthorized(response.data.ok);
      } catch (error) {
        setIsUserAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) {
      checkUserAuthorization();
    }
  }, [auth?.token]);

  useEffect(() => {
    if (!isUserAuthorized && !loading) {
      toast.error('You are not authorized');

      const redirectTimer = setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => clearTimeout(redirectTimer);
    }
  }, [isUserAuthorized, loading, navigate]);

  
  if (!isUserAuthorized || loading) {
    return <Spinner />;
  }

  return children;
};

export default UserAuthorization;
