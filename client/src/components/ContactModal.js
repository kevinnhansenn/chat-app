import React, { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useContact } from '../contexts/ContactsProvider';

export default function ConversationModal({ closeModal }) {
    const idRef = useRef();
    const nameRef = useRef();

    const { createContacts } = useContact();

    const addConversation = (e) => {
        e.preventDefault();
        createContacts(idRef.current.value, nameRef.current.value);
        closeModal();
    };

    return (
        <>
            <Modal.Header>Add Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={addConversation}>
                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" ref={idRef} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required />
                    </Form.Group>
                    <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </>
    );
}
