import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

function AdminPage() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("/api/v1/auth/admin/alldoctors");
            const { success, message, Doctors } = response.data; 

            if (success) {
                setUsers(Doctors); 
            } else {
                console.error("Error fetching users:", message);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };



    const handleDeleteUser = async (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/api/v1/auth/admin/deleteuser/${userId}`,);
                    fetchUsers();
                    Swal.fire("Deleted!", "User has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting user:", error);
                    Swal.fire("Error", "Failed to delete user.", "error");
                }
            }
        });
    };

    const handleApproveUser = async (doctorId, doctorName, doctorEmail) => {
        console.log("Approve user", doctorId, doctorName, doctorEmail);
        try {
            const response = await axios.patch(`/api/v1/auth/admin/approveuser/${doctorId}`, {
                doctorName,
                doctorEmail
            });
    
            if (response.status === 200) {
                fetchUsers();
                Swal.fire("Approved!", `Dr. ${doctorName} associated with (${doctorEmail}) has been approved.`, "success");
            } else {
                Swal.fire("Error", "Failed to approve user.", "error");
            }
        } catch (error) {
            console.error("Error approving user:", error);
            Swal.fire("Error", "Failed to approve user.", "error");
        }
    };
    
    

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users.map((user) => (
                    <div
                        key={user?.id}
                        className="bg-white shadow-md rounded-md p-4 flex items-center justify-between"
                    >
                        <div>
                            <h3 className="text-lg font-semibold">{user?.Name}</h3>
                            <p className="text-gray-500">{user?.email}</p>
                            <p className="text-gray-500">{user?.status}</p>
                        </div>
                        <Link to="" className="text-blue-500 font-bold hover:text-green-500 focus:outline-none ml-2 p-2 rounded-full">View Profile</Link>
                        <div className="flex items-center">
                            <button
                                onClick={() => handleDeleteUser(user?.id)}
                                className="text-red-500 hover:text-red-700 focus:outline-none ml-2 p-2 rounded-full"
                                style={{ backgroundColor: "transparent" }}
                            >
                                <RiDeleteBinLine size={24} />
                            </button>
                            {
                                !user?.isVerifiedByAdmin ? <button
                                onClick={() => handleApproveUser(user.id,user.Name, user.email)}
                                className="text-green-500 hover:text-green-700 focus:outline-none ml-2 p-2 rounded-full"
                                style={{ backgroundColor: "transparent" }}
                            >
                                Approve
                            </button> : null
                            }
                            <button
                                className="text-blue-500 hover:text-blue-700 focus:outline-none ml-2 p-2 rounded-full"
                                style={{ backgroundColor: "transparent" }}
                            >
                                <RiEdit2Line size={24} />
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPage;
