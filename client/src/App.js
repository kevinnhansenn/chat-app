import React, { Fragment } from 'react';
import Login from './views/Login';
import useLocalStorage from './hooks/useLocalstorage';
import Dashboard from './views/Dashboard';
import { ContactsProvider } from './contexts/ContactsProvider';
import { ConversationsProvider } from './contexts/ConversationsProvider';
import { SocketProvider } from './contexts/SocketProvider';

function App() {
    const [id, setId] = useLocalStorage('id');

    const dashboard = (
        <SocketProvider id={id}>
            <ContactsProvider>
                <ConversationsProvider>
                    <Dashboard id={id} />
                </ConversationsProvider>
            </ContactsProvider>
        </SocketProvider>
    );

    return <Fragment>{id ? dashboard : <Login onLogin={setId} />}</Fragment>;
}

export default App;
