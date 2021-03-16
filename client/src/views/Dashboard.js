import React from 'react';
import Sidebar from '../components/Sidebar';
import OpenConversation from './OpenConversation';

export default function Dashboard({ id }) {
    return (
        <div className="d-flex" style={{ height: '100vh' }}>
            <Sidebar id={id} />
            <OpenConversation id={id} />
        </div>
    );
}
