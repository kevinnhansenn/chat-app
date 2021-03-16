import React, { useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { v4 as uuidV4 } from 'uuid';

export default function Login({ onLogin }) {
    const formRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        onLogin(formRef.current.value);
    };

    const registerNewId = (e) => {
        e.preventDefault();
        onLogin(uuidV4());
    };

    return (
        <Container
            className="d-flex align-items-center"
            style={{ height: '100vh' }}
        >
            <Form onSubmit={onSubmit} className="w-100">
                <Form.Group>
                    <Form.Label>Enter your Id:</Form.Label>
                    <Form.Control type="text" ref={formRef} required />
                </Form.Group>
                <Button type="submit" className="mr-2">
                    Submit
                </Button>
                <Button variant="secondary" onClick={registerNewId}>
                    Register new ID
                </Button>
            </Form>
        </Container>
    );
}
