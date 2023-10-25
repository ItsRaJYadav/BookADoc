import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { RiCheckboxCircleFill, RiErrorWarningFill } from "react-icons/ri";
import axios from "axios";
import "./EmailVerify.css";

const EmailVerify = () => {
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const [data, setData] = useState({});
  const param = useParams();
  const history = useNavigate();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `/api/v1/doc/verify-doctors-email/${param.token}`;
        const response = await axios.get(url);
        const responseData = response.data;

        if (responseData.success) {
          setData(responseData);
          setVerificationStatus("success");
          // Redirect to the login page after 5 seconds
          setTimeout(() => {
            history("/login");
          }, 5000);
        } else {
          setVerificationStatus("error");
        }
      } catch (error) {
        setVerificationStatus("error");
      }
    };
    verifyEmailUrl();
  }, [param, history]);

  const renderContent = () => {
    switch (verificationStatus) {
      case "success":
        return (
          <div className="status-container success">
            <RiCheckboxCircleFill className="status-icon" />
            <h1 className="status-text">{data.message}</h1>
            <p>You will be redirected to the login page in 5 seconds.</p>
            <Link to="/login" className="btn">
              Login Now
            </Link>
          </div>
        );
      case "error":
        return (
          <div className="status-container error">
            <RiErrorWarningFill className="status-icon" />
            <h1 className="status-text">An error occurred while verifying your email.</h1>
            <p>Please try again later.</p>
          </div>
        );
      default:
        return (
          <div className="status-container">
            <p>Verifying...</p>
          </div>
        );
    }
  };

  return <div className="email-verify-container">{renderContent()}</div>;
};

export default EmailVerify;
