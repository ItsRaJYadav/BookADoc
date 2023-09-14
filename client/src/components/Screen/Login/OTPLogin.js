import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contextApi/auth';
import WelcomeMessage from './Welcome';
import OTPInput from 'react-otp-input';

const OTPLogin = ({ email, password,role }) => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [otp, setOTP] = useState('');
  const [resendDisabled, setResendDisabled] = useState(true);
  const [remainingTime, setRemainingTime] = useState(120); 

  useEffect(() => {
    let timer;

    if (resendDisabled) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (remainingTime <= 0) {
      setResendDisabled(false);
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [resendDisabled, remainingTime]);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/login_via_otp', {
        emailOrUsername:email,
        otpCode: otp,
        role
      });

      if (res.status === 200) {
        // OTP Verification successful
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('CurrentUser', JSON.stringify(res.data));

        const userData = JSON.parse(localStorage.getItem('CurrentUser'));

        const { name, avtar } = userData.user; 
        toast.custom((t) => <WelcomeMessage name={name} avatar={avtar} message={res.data.message} />);

        setTimeout(() => {
          navigate(location.state || '/');
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error(error.response.data.message);
        } else {
          toast.error('An error occurred while verifying the account');
        }
      } else if (error.request) {
        toast.error('No response received from the server');
      }
    }
  };

  const handleResendOTPClick = async (e) => {
    e.preventDefault();
    setResendDisabled(true);
    setRemainingTime(120);
    try {
      const res = await axios.post('/api/v1/auth/login', {
        email,
        password,
      });
      if (res.status === 200) {
        toast.success('OTP sent successfully');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error('No response received from the server');
      } else {
        toast.error('Error submitting form');
      }
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email OTP Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>
          <div>
            <form onSubmit={handleVerify} method="post">
              <div className="flex flex-col space-y-16">
                <OTPInput
                  value={otp}
                  onChange={setOTP}
                  numInputs={6}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  renderSeparator={<span className="mx-2">-</span>}
                  renderInput={(props) => <input {...props} style={{ width: '40px' }}/>}
      
                  containerStyle="flex justify-center"
                  inputStyle="w-30 h-12 text-center text-lg border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                />

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    >
                      Verify OTP
                    </button>
                  </div>
                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>
                    {remainingTime > 0 && (
                      <p>
                        {`Resend in ${Math.floor(remainingTime / 60)}:${remainingTime % 60}`}
                      </p>
                    )}
                    {!resendDisabled && (
                      <button
                        className="flex flex-row items-center text-blue-600 cursor-pointer"
                        onClick={handleResendOTPClick}
                      >
                        Resend
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPLogin;
