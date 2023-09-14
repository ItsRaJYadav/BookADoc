import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useAuth } from "../../../contextApi/auth";

const UserProfile = () => {
    const [auth] = useAuth();


    return (
        <div className="bg-gray-100 min-h-screen">
            <div
                className="bg-cover bg-center h-40 sm:h-64"
                style={{ backgroundImage: `url(https://cdn.pixabay.com/photo/2017/07/23/16/01/nature-2531761_1280.jpg)` }}
            ></div>


            <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">

                        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden">
                            <img src={auth?.user?.avatar} alt={auth?.user?.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-grow">
                            <h1 className="text-2xl font-semibold">{auth?.user?.username}</h1>
                            <p className="text-gray-600">@{auth?.user?.username}</p>
                            { auth?.user?.isVerified && (
                                <div className="flex items-center text-green-600 mt-2">
                                    <FaCheckCircle className="mr-1" />
                                    Verified
                                </div>
                            )}
                            <p className="text-gray-600 mt-2">{auth?.user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
