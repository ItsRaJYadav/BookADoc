import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../contextApi/auth';
import toast from 'react-hot-toast';
import { Blocks } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [authUser] = useAuth();
    const navigate=useNavigate();
    const [docData, setDocData] = useState(null);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const doctorId = authUser?.user?.id;

    const [formValues, setFormValues] = useState({
        name: '',
        username: '',
        timings: '',
        file: null,
        avatarUrl: '',
    });



    useEffect(() => {
        axios.get(`/api/v1/doc/doctorInfo/${doctorId}`)
            .then(response => {
                const docData = response.data;
                setDocData(docData);
                // console.log(docData);
                setFormValues({
                    name: docData.doctor.Name,
                    timings: docData.doctor.timings,
                    username: docData.doctor.username,
                    feesPerConsultation: docData.doctor.feesPerConsultation,
                    avatarUrl: docData.doctor.avatarUrl || '',
                });
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [doctorId]);


    const handleSaveProfile = () => {
        setIsSavingProfile(true);
        const formData = new FormData();
        formData.append('name', formValues.name);
        formData.append('username', formValues.username);
        formData.append('timings', formValues.timings);
        formData.append('feesPerConsultation', formValues.feesPerConsultation);
        formData.append('file', formValues.file);

        axios.patch(`/api/v1/doc/profile_update/${doctorId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log('Profile Updated:', response.data);
                toast.success(response.data.message);
                setIsSavingProfile(false);
               navigate('/doctor/profile');

            })
            .catch(error => {
                setIsSavingProfile(false);
                toast.error(`Error: ${error.response?.data?.message || 'Profile update failed'}`);

                console.error('Error updating profile:', error);
            });
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleFileChange = event => {
        const file = event.target.files[0];
        setFormValues({
            ...formValues,
            file: file,
            avatarUrl: file ? URL.createObjectURL(file) : '',
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen">

            <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">



                    <form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-600 font-medium">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formValues.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-600 font-medium">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formValues.username}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-600 font-medium"><div className="mb-4">
                                <label htmlFor="username" className="block text-gray-600 font-medium">timings</label>
                                <input
                                    type="text"
                                    id="timings"
                                    name="timings"
                                    value={formValues.timings}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div></label>
                           
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-600 font-medium"><div className="mb-4">
                                <label htmlFor="username" className="block text-gray-600 font-medium">feesPerConsultation in Rupees</label>
                                <input
                                    type="number"
                                    id="feesPerConsultation"
                                    name="feesPerConsultation"
                                    value={formValues.feesPerConsultation}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div></label>
                           
                        </div>
                        <div className="mb-4">
                            <label htmlFor="avatar" className="block text-gray-600 font-medium">Avatar</label>
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                onChange={handleFileChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        {isSavingProfile ? (
                            <div >
                                <Blocks
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="blocks-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="blocks-wrapper"
                                />
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleSaveProfile}
                            >
                                Save Profile
                            </button>
                        )}
                    </form>

                </div>
            </div>
        </div>
    );
};

export default UserProfile;
