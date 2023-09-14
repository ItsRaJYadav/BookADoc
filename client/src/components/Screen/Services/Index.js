import React from 'react';
import {
    FaCalendarCheck,
    FaUserMd,
    FaStethoscope,
    FaFileMedicalAlt,
    FaMedkit,
    FaAmbulance,
} from 'react-icons/fa';

const Services = () => {
    const services = [
        {
            icon: <FaCalendarCheck size={48} />,
            title: 'Online Appointments',
            description: 'Schedule doctor appointments online for your convenience.',
        },
        {
            icon: <FaUserMd size={48} />,
            title: 'Medical Records',
            description: 'Access and manage your medical records securely online.',
        },
        {
            icon: <FaStethoscope size={48} />,
            title: 'Specialist Consultations',
            description: 'Connect with specialized doctors for expert consultations.',
        },
        {
            icon: <FaFileMedicalAlt size={48} />,
            title: 'Health Reports',
            description: 'View and download your health reports anytime.',
        },
        {
            icon: <FaMedkit size={48} />,
            title: 'Prescription Refills',
            description: 'Request prescription refills with ease.',
        },
        {
            icon: <FaAmbulance size={48} />,
            title: 'Emergency Services',
            description: 'Access emergency services and information quickly.',
        },
    ];

    return (
        <div className="bg-white">
            <div className="container px-12 py-8 mx-auto ">
                <h1 className="text-2xl font-medium text-gray-800 capitalize lg:text-3xl">
                    Our Services
                </h1>
                <div className="mt-4">
                    <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                    <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
                    <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
                </div>
                <p className="mt-4 font-medium text-gray-500">
                    Explore the services we offer to make your healthcare experience
                    better.
                </p>

                <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300 ease-in-out"
                        >
                            <div className="text-blue-500">{service.icon}</div>
                            <h2 className="mt-4 text-xl font-semibold text-gray-700">
                                {service.title}
                            </h2>
                            <p className="mt-2 text-gray-500">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
