import React, { useState } from 'react';
import { useAuth } from '../../../../contextApi/auth';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import Footer from '../../../Global/Footer';
import { useLocation, useParams } from 'react-router-dom';


const Loader = () => <div>Booking appointment...</div>;

const AllDoctorDetails = () => {
    const {doctorId}=useParams();
    const location = useLocation();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [subject, setsubject] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const currentDate = new Date().toISOString().split('T')[0];

    const [authUser] = useAuth();
    const userId = authUser?.user?.id;
    const patientEmail = authUser?.user?.email;
    const patientName = authUser?.user?.name;

    const doctorName = location.state ? location.state.name : '';
    const DoctorEmail = location.state ? location.state.email : '';
    const appointmentFee = location.state ? location.state.fee : '';





    const handleCheckout = async () => {
        // console.log(appointmentFee)
        if (!selectedDate || !selectedTime || !age || !phone || !subject) {
            toast.error("please fill all the required details");
            return;
        }
        setLoading(true);
        try {
            const stripe = await loadStripe('pk_test_51NpVGESBwsb1baqVDcJTNoefqeKSTTMf99V2c8PoZ0wMSWLHa1SqaHgCxlyV0zfQ0zs5f5E02JRciBCZIpCyYhGa00G31fchKV');

            const body = {
                AppointmentDetails: [
                    {
                        name: `You are Booking an appointment with ${doctorName} at ${selectedDate} on ${selectedTime}`,
                        price: appointmentFee,
                        quantity: 1,
                        userId,
                        doctorId,
                        subject,
                        date: selectedDate,
                        time: selectedTime,
                        patientEmail,
                        patientName,
                        phone,
                        age,
                        DoctorEmail,
                        doctorName
                    }
                ],
            };

            const headers = {
                'Content-Type': 'application/json',
            };

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/appoint/stripepay`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                setLoading(false);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const session = await response.json();

            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.log(result.error);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };







    return (

        <>
            <div className="bg-gray-100 min-h-screen px-8 p-5">
                <div className="bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all my-4 w-full max-w-screen-lg mx-auto">

                    <div className="container mx-auto py-8">
                        <h2 className="text-2xl font-semibold mb-4 text-center ">Book Appointment</h2>
                        <h3 className="text-2xl font-semibold mb-4"> Hey {authUser?.user?.name} you are currently booking appointment to {doctorName} </h3>
                        {/* Date and Time Selection */}
                        <div className="mb-4">
                            <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                                Select Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                required
                                min={currentDate}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">
                                Select Time
                            </label>
                            <input
                                type="time"
                                id="time"
                                className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">
                                Age
                            </label>
                            <input
                                type="number"
                                id="age"
                                className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Enter Age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Enter Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">
                                Add some Notes about your Appointment
                            </label>
                            <input
                                type="text"
                                id="subject"
                                className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Enter Subject"
                                value={subject}
                                onChange={(e) => setsubject(e.target.value)}
                                required
                            />

                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={loading}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded mt-2"
                        >
                            {loading ? <Loader /> : 'Confirm Appointment'}
                        </button>

                    </div>

                </div>
            </div>


            <Footer />
        </>
    );
};

export default AllDoctorDetails;




