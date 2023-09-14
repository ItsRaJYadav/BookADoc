import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Global/Headers/Index.js";
import ProtectedRoutes from "./components/ProtectedRoutes/UserCheck";
import DoctorCheck from "./components/ProtectedRoutes/DoctorCheck.js";
import ErrorPage from "./components/Global/Error";


import User from "./components/Screen/User/Index.js";
import DashBoard from "./components/Screen/User/DashBoard.js";
import Appointments from "./components/Screen/User/Appointments.js";
import UserProfile from "./components/Screen/User/UserInfo.js";
import UserVerify from "./components/Utils/VerifyEmail.js";
import UpdateProfile from "./components/Screen/User/UpdateProfile";
import ForgotPasswordPage from "./components/Utils/ForgotPassword.js";


import Home from "./components/Screen/Home";
import Login from "./components/Screen/Login";
import Register from "./components/Screen/Register";

import About from "./components/Screen/About";
import Pricing from "./components/Screen/Pricing/index.js";
import ContactForm from "./components/Screen/Contact/Index";
import AllDoctors from "./components/Screen/Doctor/Public/AllDoctors.js";
import DoctorProfile from "./components/Screen/Doctor/Public/Profile.js";
import AppointmentBooking from "./components/Screen/Doctor/Public/AppointmentBooking.js";
import Services from "./components/Screen/Services/Index.js";
import DoctorRegistrationForm from "./components/Screen/Register/DoctorRegistration.js";


import AdminCheck from "./components/ProtectedRoutes/AdminCheck";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AllUsers from "./components/Admin/AllUsers";
import AllDoctorList from "./components/Admin/AllDoctor.js";
import AdminNotifications from "./components/Admin/Notifications.js";
import Notification from "./components/Screen/User/Notification.js";
import Subscription from "./components/Screen/User/Subscription.js";
import PrivateProfile from "./components/Screen/Doctor/PrivateProfile.js";
import DoctorDashboard from "./components/Screen/Doctor/Dashboard.js";
import DoctorSidebar from "./components/Screen/Doctor/Index.js";
import AllAppointments from "./components/Screen/Doctor/AllAppointments.js";
import Notifications from "./components/Screen/Doctor/Notification.js";
import Room from "./components/Socket/Room.js";
import VideoCall from "./components/WebRTC/VideoCall.js";
import Success from "./components/Utils/Success.js";
import Cancel from "./components/Utils/Cancel";
import EditAppointment from "./components/Screen/User/EditAppointment.js";
import ReviewDoctor from "./components/Screen/Doctor/Public/DoctorReview.js";


function App() {
  return (
    <Router>
      <Header />


      <Routes>    {/* Protected routes for user */}
        <Route path="/user" element={<ProtectedRoutes><User /></ProtectedRoutes>}>
          <Route index element={<DashBoard />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="appointments/edit/:appointmentId" element={<EditAppointment />} />
          <Route path="notifications" element={<Notification />} />
          <Route path="chat_to_doctor" element={<Room />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="updateProfile/:id" element={<UpdateProfile />} />
         
        </Route>



        {/* Protected routes for Doctor */}
        <Route path="/doctor" element={<DoctorCheck><DoctorSidebar /></DoctorCheck>}>
          <Route element={<DoctorDashboard />} />
          <Route path='dashboard' element={<DoctorDashboard />} />
          <Route path="profile" element={<PrivateProfile />} />
          <Route path="allappointments" element={<AllAppointments />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="chat_to_user" element={<Room />} />
        </Route>

        {/* Protected routes for admin */}
        <Route path="/admin" element={<AdminCheck><AdminDashboard /></AdminCheck>}>
          <Route path="alluser" element={<AllUsers />} />
          <Route path="doctorslist" element={<AllDoctorList />} />
          <Route path="notifications" element={<AdminNotifications />} />

        </Route>



        <Route path="/alldoctors" element={<AllDoctors />} />
        <Route path="/doctor-profile/:doctorId" element={<DoctorProfile />} />
        <Route path="/booking_appointment/:doctorId" element={<AppointmentBooking />} />
        <Route path="/video_consultancy" element={<VideoCall />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-email/:token" element={<UserVerify />} exact />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctor-signup" element={<DoctorRegistrationForm />} />
        <Route path="/contacts" element={<ContactForm />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/services" element={<Services />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/doctor/reviews" element={<ReviewDoctor />} />
      </Routes>
    </Router>
  );
}

export default App;
