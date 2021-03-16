import React, { useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
    const [socket, setSocket] = useState();

    useEffect(() => {
        const socketConnection = io('http://localhost:5000', {
            query: {
                id,
            },
        });
        setSocket(socketConnection);
        return () => {
            socketConnection.close();
        };
    }, [id]);

    return (
        <SocketContext.Provider value={{ socket, setSocket }}>
            {children}
        </SocketContext.Provider>
    );
}
