import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiLoader } from 'react-icons/fi'
import axios from 'axios';
import ResetPassword from './ResetPassword'
import { toast } from 'react-hot-toast';


const ForgotPassword = () => {
    const emailref = useRef();
    const [email, setEmail] = useState('');
    const [otpform, ShowResetform] = useState(true);
    const [loading, SetLoading] = useState(false);
    const [role, setRole] = useState('user');

    const handleSubmit = async (e) => {
        e.preventDefault();
        SetLoading(true);
        console.log(`email is ${email}, role is ${role}`); 
        try {
          const response = await axios.post(`/api/v1/auth/forgot_password`, {
            email: email,
            role: role, 
          });
      
          console.log(response.data);
          if (response.status === 200) {
            SetLoading(false);
            toast.success(`An OTP is sent to your email ${email}`);
      
            setTimeout(() => {
              ShowResetform(false);
            }, 1500); 
          } else {
            SetLoading(false);
            toast.error(response.data.message);
          }
        } catch (err) {
          SetLoading(false);
          console.log(err);
        }
      };
      



    return (
        <>



            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md">
                    {
                        otpform ? <div> <form
                            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-6">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="role"
                                >
                                    Select Role
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="user">User</option>
                                    <option value="doctor">Doctor</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="email"
                                >
                                    Email Address
                                </label>
                                <input
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    ref={emailref}
                                />

                            </div>

                            <div className="flex items-center justify-center">
                                {loading ? (
                                    <div className="flex items-center justify-center mb-6">
                                        <FiLoader className="animate-spin text-2xl mr-2" />
                                        Sending OTP...
                                    </div>

                                ) : (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Send OTP
                                    </button>
                                )}
                                <Link
                                    to="/login"
                                    className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 sm:mt-0 ml-2 sm:ml-4"
                                >
                                    Back
                                </Link>
                            </div>
                        </form></div> : <div> <ResetPassword email={emailref.current.value} role={role} /> </div>
                    }

                </div>
            </div>




        </>
    );
};

export default ForgotPassword;