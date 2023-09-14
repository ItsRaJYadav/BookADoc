import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../../../../contextApi/auth';
import toast from 'react-hot-toast';

const ReviewDoctor = ({ doctorId }) => {
    const [comments, setComments] = useState('');
    const [rating, setRating] = useState();
    const [showRatingScale, setShowRatingScale] = useState(false);
    const [ratingText, setRatingText] = useState('');
    const [authUser] = useAuth();
    const userId = authUser?.user?.id;
    const userName = authUser?.user?.username;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!authUser || !authUser.user) {
            toast.error('Please login first before submitting your feedback');
            return;
        }
        if (!comments || !rating) {
            alert('Please provide comments and ratings.');
            return;
        }

        try {
            const response = await axios.post('/api/v1/doc/feedback', {
                comments,
                rating,
                userId,
                userName,
                doctorId
            });

            if (response.status === 201) {
                toast.success('Your feedback has been submitted');
                setComments('');
                setRating('');
            }
        } catch (error) {
            if (error.response) {
                const statusCode = error.response.status;
                const errorMessage = error.response.data.error;

                if (statusCode === 400) {
                    toast.error(`${errorMessage}`);
                } else if (statusCode === 409) {
                    toast.error(`Conflict: ${errorMessage}`);
                } else {
                    toast.error(`Error (${statusCode}): ${errorMessage}`);
                }
            } else {

                console.error('Error submitting feedback:', error);
                alert('Error submitting feedback. Please try again later.');
            }
        }
    };


    const renderStars = () => {
        const starArray = [];
        const ratingTexts = ['Poor', 'Average', 'Good', 'Excellent', 'Outstanding'];

        for (let i = 1; i <= 5; i++) {
            starArray.push(
                <FaStar
                    key={i}
                    className={i <= rating ? 'text-yellow-500' : 'text-gray-300'}
                    onClick={() => {
                        setRating(i);
                        setShowRatingScale(true);
                        setRatingText(ratingTexts[i - 1]);
                    }}
                />
            );
        }
        return starArray;
    };

    return (
        <div className="container mx-auto p-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold mb-6">Review Your Doctor</h1>


            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="mb-4">
                    <label htmlFor="comments" className="block text-gray-700 text-sm font-bold mb-2">
                        Comments:
                    </label>
                    <textarea
                        id="comments"
                        name="comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        rows="4"
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Ratings:</label>
                    <div className="flex items-center">
                        {renderStars()}
                        {showRatingScale && (
                            <span className="ml-2 text-gray-500">
                                {ratingText}
                            </span>
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>

        </div>
    );
};

export default ReviewDoctor;
