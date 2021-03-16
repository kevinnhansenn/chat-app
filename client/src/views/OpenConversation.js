import React, { useCallback, useRef, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useConversation } from '../contexts/ConversationsProvider';
import { useContact } from '../contexts/ContactsProvider';

export default function OpenConversation({ id }) {
    const [text, setText] = useState('');
    const ref = useRef();
    const { contacts } = useContact();

    const setRef = useCallback((node) => {
        node && node.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const {
        _conversations,
        selectedConversationId,
        addConversation,
    } = useConversation();

    const _conversation = _conversations.find(
        (conversation) => conversation.id === selectedConversationId
    );

    const activeMessages = _conversation ? _conversation.messages : [];

    activeMessages.forEach((message) => {
        const sender = contacts.find(
            (contact) => contact.id === message.senderId
        );

        message.senderName = sender ? sender.name : message.senderId;
    });

    const submitMsg = (e) => {
        e.preventDefault();
        addConversation(id, ref.current.value);
        setText('');
    };

    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column flex-grow-1 align-items-start justify-content-end px-3">
                    {activeMessages.map((activeMsg, index) => {
                        const fromMe = activeMsg.senderId === id;
                        const lastMsg = index === activeMessages.length - 1;
                        return (
                            <div
                                ref={lastMsg ? setRef : null}
                                key={index}
                                className={`my-1 d-flex flex-column ${
                                    fromMe ? 'align-self-end' : ''
                                }`}
                            >
                                <div
                                    className={`rounded px-2 py-1 ${
                                        fromMe
                                            ? 'bg-primary text-white'
                                            : 'border'
                                    }`}
                                >
                                    {activeMsg.message}
                                </div>
                                <div
                                    className={`text-muted small ${
                                        fromMe ? 'text-right' : ''
                                    }`}
                                >
                                    {fromMe ? 'Me' : activeMsg.senderName}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Form className="m-2" onSubmit={submitMsg}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                            ref={ref}
                            required
                            value={text}
                            as="textarea"
                            onChange={(e) => setText(e.target.value)}
                            style={{ resize: 'none', height: '75px' }}
                        />
                        <InputGroup.Append>
                            <Button type="submit">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    );
}
