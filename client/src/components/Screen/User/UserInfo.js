import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../../../contextApi/auth';
import toast from 'react-hot-toast';
import { Blocks } from 'react-loader-spinner';

const UserProfile = () => {
    const [authUser] = useAuth();
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const userId = authUser?.user?.id;

    const [formValues, setFormValues] = useState({
        name: '',
        username: '',
        file: null,
        avatarUrl: '',
    });



    useEffect(() => {
        axios.get(`/api/v1/auth/userinfo/${userId}`)
            .then(response => {
                const userData = response.data;
                setUserData(userData);

                setFormValues({
                    name: userData.user.name,
                    username: userData.user.username,
                    avatarUrl: userData.user.avatarUrl || '',
                });
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [userId]);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = () => {
        setIsSavingProfile(true);
        const formData = new FormData();
        formData.append('name', formValues.name);
        formData.append('username', formValues.username);
        formData.append('file', formValues.file);

        axios.put(`/api/v1/auth/updateProfile/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log('Profile Updated:', response.data);
                toast.success(response.data.message);
                setIsSavingProfile(false);
                setIsEditing(false);
                axios.get(`/api/v1/auth/userinfo/${userId}`)
                    .then(response => {
                        const userData = response.data;
                        setUserData(userData);
                    })
                    .catch(error => {
                        console.error(error);
                    });

            })
            .catch(error => {
                setIsEditing(false);
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
            <div
                className="bg-cover bg-center h-40 sm:h-64"
                style={{ backgroundImage: `url(https://cdn.pixabay.com/photo/2017/07/23/16/01/nature-2531761_1280.jpg)` }}
            ></div>

            <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                    {userData ? (
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden">
                                <img src={userData?.user?.avatar} alt={userData?.user?.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-grow">
                                <h1 className="text-2xl font-semibold">
                                    {userData?.user?.name}
                                    {userData?.user?.isVerified && (
                                        <span className="text-green-600 ml-2">
                                            <FaCheckCircle className="inline-block mr-1" />
                                            Verified
                                        </span>
                                    )}
                                </h1>
                                <p className="text-gray-600">@{userData?.user?.username}</p>
                                <p className="text-gray-600 mt-2">{userData?.user?.email}</p>
                                <p className="text-gray-600 mt-2">Account Created: {new Date(userData?.user?.createdAt).toLocaleDateString()}</p>
                                <p className="text-gray-600 mt-2">Last Updated: {new Date(userData?.user?.updatedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ) : (
                        <p>Loading user data...</p>
                    )}

                    {isEditing ? ( 
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
                    ) : (
                        <button
                            type="button"
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleEditProfile} // Call handleEditProfile when editing
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
