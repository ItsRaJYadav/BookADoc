import React, { useContext, useEffect, useState } from 'react';
import './Style.css';
import axios from 'axios';
import { SocketContext } from '../../contextApi/SocketContext';
import { useAuth } from '../../contextApi/auth';
import UserImage from '../assets/userImg.jpg'
import docImage from '../assets/docImg.png'
import notificationSound from '../assets/notification.mp3';
import { AiOutlineSend } from 'react-icons/ai';
import { FaComments } from 'react-icons/fa';


function App() {
  const [auth] = useAuth();
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [chat, setChat] = useState([]);
  const [selectedFinalId, setSelectedFinalId] = useState(null); // Selected room
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [roomIds, setRoomIds] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [roomChatMessages, setRoomChatMessages] = useState([]); // Chat messages for the selected room
  const notificationAudio = new Audio(notificationSound);




  const role = auth?.user.isDoctor === true ? 'doctor' : 'patient';
  // console.log(role);

  const Id = auth?.user?.id;

  const [userMappings, setUserMappings] = useState({}); // User mappings 

  // Function to fetch chat messages for the selected room
  const fetchChatMessages = async (roomId) => {
    try {
      const response = await axios.get(`/api/v1/message/getall/${roomId}`);
      const { messages } = response.data;
      setRoomChatMessages(messages);
    } catch (error) {
      console.error('Error fetching chat messages: ', error);
    }
  };

  useEffect(() => {
    const fetchRoomIds = async () => {
      try {
        const response = await axios.get(`/api/v1/appoint/getRoomId/${Id}?role=${role}`);
        const { data } = response;
        const roomIds = data.map((item) => item.roomId); // Extract room IDs from the response

        setRoomIds(data); // Update the state variable with the room data
        // console.log(response);
        // console.log(roomIds);

        //user mappings
        const mappings = {};
        data.forEach((room) => {
          if (role === 'doctor') {
            mappings[room.doctorId] = room.doctorName;
          } else {
            mappings[room.userId] = room.userName;
          }
        });
        setUserMappings(mappings);
      } catch (error) {
        console.error('Error fetching room IDs: ', error);
      }
    };

    fetchRoomIds();
  }, [Id, role]);

  useEffect(() => {
    if (selectedRoomId) {
      socket.emit('join-room', { roomId: selectedRoomId, role });
      setSelectedFinalId(selectedRoomId);
      fetchChatMessages(selectedRoomId);
    }
  }, [socket, selectedRoomId]);

  useEffect(() => {
    socket.on('server_message', (data) => {
      setRoomChatMessages((prevMessages) => [...prevMessages, { text: data.message, senderId: data.senderId }]);

      // Update the chat history 
      setChat((prev) => [...prev, { message: data.message, received: true }]);
      notificationAudio.play();
    });

    socket.on('typing-started-from-server', () => {
      setTyping(true);
    });

    socket.on('typing-stopped-from-server', () => {
      setTyping(false);
    });

    return () => {
      socket.off('server_message');
    };
  }, [socket]);






  const handleMessageChange = (e) => {
    setMessage(e.target.value);

    if (selectedFinalId) {
      socket.emit('typing', { roomId: selectedFinalId });
      if (typingTimeout) clearTimeout(typingTimeout);
      setTypingTimeout(
        setTimeout(() => {
          socket.emit('stop_typing', { roomId: selectedFinalId });
        }, 5000)
      );
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (socket && message.trim() !== '' && selectedFinalId) {
      socket.emit('chat_message', { message, roomId: selectedFinalId, senderId: Id });
      // Update roomChatMessages immediately when sending a new message
      setRoomChatMessages((prev) => [...prev, { text: message, senderId: Id }]);
      setMessage('');
    }
  };

  const handleRoomSelectChange = (e) => {
    const selectedId = e.target.value;
    if (selectedId) {
      setSelectedRoomId(selectedId);

      // Clear chat 
      setChat([]);
      setMessage('');
      setRoomChatMessages([]);
    }

  };

  useEffect(() => {
    const chatContainer = document.querySelector('.chat-messages');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [roomChatMessages]);

  return (
    <div className="App">
      <div className="messenger-container">
        {/* Left Sidebar */}
        <div className="left-sidebar">
          <h1>Available Chat</h1>
          <ul>
            {roomIds.map((room) => (
              <li
                key={room.id}
                className={room.id === selectedRoomId ? 'active' : ''}
                onClick={() => handleRoomSelectChange({ target: { value: room.id } })}
              >

                <div className="user-profile flex items-center space-x-4">

                  <img
                    src={role !== 'doctor' ? UserImage : docImage}
                    alt={role === 'doctor' ? room.doctorName : room.patientName}
                    className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <h3 className="text-xl">
                      {role === 'doctor' ? room.userName : room.doctorName}
                    </h3>

                  </div>
                </div>

              </li>
            ))}
          </ul>
        </div>

        {/* Right Chat Area */}

        <div className="right-chat-area">
          {selectedRoomId ? (
            <div className="user-profile flex items-center space-x-4 ml-3">
              <img
                src={role !== 'doctor' ? UserImage : docImage}
                alt="dp"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl">{auth?.user?.name}</h3>
                <p className={auth?.user?.online ? 'text-green-500' : 'text-red-500'}>
                  {auth?.user?.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="select-room-message flex flex-col items-center justify-center h-full text-center">
                <FaComments className="text-4xl text-blue-500 mb-4" />
                <p className="text-xl font-bold mb-2 text-gray-800">Welcome to the BookADoc Chat App</p>
                <p className="text-gray-500">Select a room from the left sidebar to start chatting.</p>
              </div>
            </>
          )}
          <div className="chat-messages">
            {/* Chat messages */}
            {roomChatMessages.map((msg, index) => {
              const isSender = msg.senderId === Id;
              const previousMsg = roomChatMessages[index - 1];
              const isNewSender = !previousMsg || previousMsg.senderId !== msg.senderId;

              return (
                <div
                  key={index}
                  className={`message ${isSender ? 'sent' : 'received'} ${isNewSender ? 'new-sender' : ''}`}
                >
                  {msg.text}
                  <span className="text-xs text-gray-900 ml-3">
                    {msg.time}
                  </span>
                </div>
              );
            })}

            {typing && (
              <div className="typing-indicator">
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
              </div>
            )}
          </div>

          {/* Message Input */}
          {selectedRoomId && (
            <form onSubmit={handleSendMessage}>
              <div className="message-form p-4 bg-white rounded-lg shadow-md">
                <input
                  type="text"
                  placeholder="Enter your message"
                  value={message}
                  onChange={handleMessageChange}
                  className="w-full px-2 py-1 border rounded-md outline-none"
                />
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  <AiOutlineSend />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
