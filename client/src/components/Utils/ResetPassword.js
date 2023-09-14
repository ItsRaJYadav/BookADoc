import React, { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ResetPasswordForm({ email, role }) {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    if (!otp || !newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (otp.length !== 6) {
      setError("Invalid OTP");
      return;
    }

    try {
      const apiUrl =  '/api/v1/auth/update_password';
      const formData = {
        email,
        otpCode: otp,
        password: newPassword,
        role
      };

      const response = await axios.patch(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Password updated successfully");
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        toast.error("Error updating password");
      }
    } catch (error) {
      toast.error("Error updating password");
    }

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="flex items-center">
              <RiLockPasswordLine className="mr-2" />
              OTP:
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="flex items-center">
              <RiLockPasswordLine className="mr-2" />
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="flex items-center">
              <RiLockPasswordLine className="mr-2" />
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            <TiTick className="mr-2" />
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordForm;