import React, { useContext, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import useLocalStorage from '../hooks/useLocalstorage';
import { useContact } from './ContactsProvider';
import { useSocket } from './SocketProvider';

const ConversationsContext = React.createContext();

export function useConversation() {
    return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
    const [conversations, setConversations] = useLocalStorage(
        'conversations',
        []
    );

    const { socket } = useSocket();

    const [selectedConversationId, setSelectedConversationId] = useState();

    const createNewConversations = (
        recipients,
        conversationId,
        messages = []
    ) => {
        setConversations((prevConversation) => {
            const id = conversationId || uuid();
            return [...prevConversation, { id, recipients, messages }];
        });
    };

    const appendConversation = ({ conversationId, senderId, message }) => {
        setConversations((prevConversation) => {
            const _conversation = prevConversation.find(
                (conversation) => conversation.id === conversationId
            );

            _conversation.messages.push({
                senderId,
                message,
            });
            return [...prevConversation];
        });
    };

    useEffect(() => {
        console.log('executed');
    }, [conversations]);

    useEffect(() => {
        if (socket == null) return;
        const socketConnection = socket.on(
            'receive-message',
            ({ conversationId, recipients, senderId, message }) => {
                const alreadyExists = conversations.some(
                    (conversation) => conversation.id === conversationId
                );

                if (alreadyExists) {
                    // Append to currently already exist conversation ID
                    appendConversation({ conversationId, senderId, message });
                } else {
                    // Create new conversation with the message
                    createNewConversations(recipients, conversationId, [
                        {
                            senderId,
                            message,
                        },
                    ]);
                }
            }
        );

        return () => socketConnection.off('receive-message');
    }, [socket, createNewConversations]);

    // get the name
    const { contacts } = useContact();
    const _conversations = [...conversations];
    _conversations.forEach((conversation) => {
        const recipients = conversation.recipients.map((recipientId) => {
            const contactFound = contacts.find(
                (contact) => contact.id === recipientId
            );
            return contactFound ? contactFound.name : recipientId;
        });

        return (conversation.recipientsName = recipients.join(', '));
    });

    const changeConversation = (id) => {
        setSelectedConversationId(id);
    };

    const addConversation = (senderId, message) => {
        const packet = conversations.find(
            (conversation) => conversation.id === selectedConversationId
        );

        socket.emit('send-message', {
            conversationId: packet.id,
            recipients: packet.recipients,
            message,
        });
    };

    const value = {
        _conversations,
        selectedConversationId,
        addConversation,
        changeConversation,
        createNewConversations,
    };

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    );
}
