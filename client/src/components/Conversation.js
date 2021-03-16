import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useConversation } from '../contexts/ConversationsProvider';

export default function Contact() {
    const {
        _conversations,
        selectedConversationId,
        changeConversation,
    } = useConversation();

    return (
        <ListGroup variant="flush">
            {_conversations.map((conversation) => (
                <ListGroup.Item
                    key={conversation.id}
                    active={selectedConversationId === conversation.id}
                    onClick={() => changeConversation(conversation.id)}
                    action
                >
                    {conversation.recipientsName}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
