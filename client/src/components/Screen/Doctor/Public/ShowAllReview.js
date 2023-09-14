import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';

const ReviewsSection = ({ doctorId }) => {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0); 

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/api/v1/doc/show-all-reviews/${doctorId}`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    useEffect(() => {
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const avgRating = totalRating / reviews.length;
            setAverageRating(avgRating);
        }
    }, [reviews]);

    return (
        <div className="bg-gray-100 p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-semibold mb-4">Average Rating: {averageRating.toFixed(1)}</h2>
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white p-4 rounded-md shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-lg font-semibold">{review.userName}</p>
                                <p className="text-gray-500">{new Date(review.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="flex items-center">
                                {Array.from({ length: review.rating }).map((_, index) => (
                                    <AiFillStar
                                        key={index}
                                        className="h-5 w-5 text-yellow-500"
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-600 mt-2">{review.comments}</p>
                    </div>
                ))}
            </div>
           
        </div>
    );
};

export default ReviewsSection;

