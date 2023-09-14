import React from 'react';
import socketio from 'socket.io-client';
const server_url= process.env.REACT_APP_BASE_URL;
export const socket = socketio.connect(server_url);
export const SocketContext = React.createContext();
