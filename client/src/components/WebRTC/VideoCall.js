import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomJoin = () => {
  const [roomID, setRoomId] = useState('');
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to the room with the specified roomId
    history(`/room/${roomID}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Join a Room</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="roomId" className="block text-gray-600">
              Room ID:
            </label>
            <input
              type="text"
              id="roomId"
              className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              value={roomID}
              onChange={(e) => setRoomId(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 transition duration-300"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomJoin;
