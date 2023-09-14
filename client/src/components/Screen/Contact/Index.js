import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'
import { ImLocation } from 'react-icons/im';
import { BsFillTelephoneFill, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FaTwitterSquare } from 'react-icons/fa';
import contactImg from '../../assets/doctor-appointment.svg'

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/v1/auth/contactforms', {
                name,
                email,
                message,
            });
            if (response.status === 200) {
                console.log('Form submitted successfully:', response.data);
                toast.success('Form submitted successfully!');
                setName('');
                setEmail('');
                setMessage('');
            }
        } catch (error) {
            // Handle error
            console.error('Error submitting form:', error.response);

            if (error.response && error.response.status === 400) {
                toast.error('Validation error. Please check your form data.');
            } else if (error.response && error.response.status === 500) {
                toast.error('Internal server error. Please try again later.');
            } else {
                toast.error('Error submitting form. Please try again.');
            }
        }
    };

    return (
        <section className="min-h-screen bg-white">
            <div className="container px-6 py-10 mx-auto">
                <div className="lg:flex lg:items-center lg:-mx-10">
                    <div className="lg:w-1/2 lg:mx-10">
                        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
                            Let’s talk
                        </h1>
                        <p className="mt-4 text-gray-500 ">
                            Ask us everything and we would love to hear from you
                        </p>
                        <form className="mt-12" onSubmit={handleSubmit}>
                            <div className="-mx-2 md:items-center md:flex">
                                <div className="flex-1 px-2">
                                    <label className="block mb-2 text-sm text-gray-800 ">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter full name"
                                        className="block w-full px-5 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="flex-1 px-2 mt-4 md:mt-0">
                                    <label className="block mb-2 text-sm text-gray-800 ">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="enter your email address"
                                        className="block w-full px-5 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                            </div>
                            <div className="w-full mt-4">
                                <label className="block mb-2 text-sm text-gray-800 ">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="block w-full h-32 px-5 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-56  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    placeholder="Message"
                                    defaultValue={""}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                get in touch
                            </button>
                        </form>
                    </div>
                    <div className="mt-12 lg:flex lg:mt-0 lg:flex-col lg:items-center lg:w-1/2 lg:mx-10">
                        <img
                            className="hidden object-cover mx-auto rounded-full lg:block shrink-0 w-96 h-96"
                            src={contactImg}
                            alt=""
                        />
                        <div className="mt-6 space-y-8 md:mt-8">
                            <p className="flex items-start -mx-2">
                                <ImLocation className="w-6 h-6 mx-2 text-blue-500 dark:text-blue-400" />
                                <span className="mx-2 text-gray-800 truncate w-72 ">
                                    New Delhi India
                                </span>
                            </p>
                            <p className="flex items-start -mx-2">
                                <BsFillTelephoneFill className="w-6 h-6 mx-2 text-blue-500 dark:text-blue-400" />
                                <span className="mx-2 text-gray-800 truncate w-72 ">
                                    +91 9472040607
                                </span>
                            </p>
                            <p className="flex items-start -mx-2">
                                <MdOutlineMailOutline className="w-6 h-6 mx-2 text-blue-500 dark:text-blue-400" />
                                <span className="mx-2 text-gray-800 truncate w-72 ">
                                    contacts@bookadoc.com
                                </span>
                            </p>
                        </div>
                        <div className="mt-6 w-80 md:mt-8">
                            <h3 className="text-gray-900 ">Follow us on our Social Platform</h3>
                            <div className="flex mt-4 -mx-1.5 ">
                                <a
                                    className="mx-1.5 dark:hover:text-blue-400 text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
                                    href="#"
                                >
                                    <FaTwitterSquare className="w-10 h-10 fill-current" />
                                </a>
                                <a
                                    className="mx-1.5 dark:hover:text-blue-400 text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
                                    href="https://www.linkedin.com/in/rajydv07/"
                                >
                                    <BsLinkedin className="w-10 h-10 fill-current" />
                                </a>
                                <a
                                    className="mx-1.5 dark:hover:text-blue-400 text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
                                    href="#"
                                >
                                    <BsInstagram className="w-10 h-10 fill-current" />
                                </a>
                                <a
                                    className="mx-1.5 dark:hover:text-blue-400 text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
                                    href="#"
                                >
                                    <FaTwitterSquare className="w-10 h-10 fill-current" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default ContactForm;
