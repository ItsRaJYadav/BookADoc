import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const EditAppointmentForm = () => {
    const { appointmentId } = useParams();
    const Navigte=useNavigate();
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        subject: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(appointmentId)
        try {
            const response = await axios.patch(`/api/v1/appoint/update/${appointmentId}`, formData);

            if (response.status === 200) {
                toast.success('Appointment updated successfully');
                Navigte('/user/appointments')

            }
        } catch (error) {
            console.error('Error updating appointment:', error);
            toast.error('Error updating appointment');
        }
    };


    const onClose = (e) => {

    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-md mx-auto w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Edit Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Time:</label>
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Subject:</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full h-32 px-4  rounded border border-gray-300 focus:outline-none focus:border-blue-500 "
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    >
                        Update
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 ml-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAppointmentForm;
