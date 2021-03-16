import React, { useState } from 'react';
import { Button, Modal, Nav, Tab } from 'react-bootstrap';
import Conversation from './Conversation';
import Contact from './Contact';
import ConversationModal from './ConversationModal';
import ContactModal from './ContactModal';

const CONVERSATION_KEY = 'conversation';
const CONTACT_KEY = 'contact';

export default function Sidebar({ id }) {
    const [activeKey, setActiveKey] = useState(CONVERSATION_KEY);
    const [modalOpen, setModalOpen] = useState(false);
    const conversationOpen = activeKey === CONVERSATION_KEY;

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div style={{ width: '250px' }} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATION_KEY}>
                            Conversations
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACT_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONVERSATION_KEY}>
                        <Conversation />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACT_KEY}>
                        <Contact />
                    </Tab.Pane>
                </Tab.Content>
                <div className="border-top border-right p-2 small">
                    Your ID: <span className="text-muted">{id}</span>
                </div>
                <Button
                    className="rounded-0"
                    onClick={() => setModalOpen(true)}
                >
                    New {conversationOpen ? 'Conversation' : 'Contact'}
                </Button>
            </Tab.Container>

            <Modal show={modalOpen} onHide={closeModal}>
                {conversationOpen ? (
                    <ConversationModal closeModal={closeModal} />
                ) : (
                    <ContactModal closeModal={closeModal} />
                )}
            </Modal>
        </div>
    );
}
