import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useContact } from '../contexts/ContactsProvider';
import { useConversation } from '../contexts/ConversationsProvider';

export default function ConversationModal({ closeModal }) {
    const { contacts } = useContact();
    const { createNewConversations } = useConversation();

    const [selectedIds, setSelectedIds] = useState([]);

    const addConversation = (e) => {
        e.preventDefault();
        createNewConversations(selectedIds);
        closeModal();
    };

    const handleChange = (id) => {
        setSelectedIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((predId) => predId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    return (
        <>
            <Modal.Header>Add Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={addConversation}>
                    {contacts.map((contact) => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check
                                type="checkbox"
                                value={selectedIds.includes(contact.id)}
                                label={contact.name}
                                onChange={() => handleChange(contact.id)}
                            />
                        </Form.Group>
                    ))}
                    <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </>
    );
}
