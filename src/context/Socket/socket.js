import socketio from "socket.io-client";
import React from "react";
export const socket = socketio.connect(process.env.REACT_APP_API_URL);

export const SocketContext = React.createContext();

export function useSocket() {
    const context = React.useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocket must be used in a SocketProvider');
    }

    return context;
}