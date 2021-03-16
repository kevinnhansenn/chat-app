import React, { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalstorage';

const ContactsContext = React.createContext();

export function useContact() {
    return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
    const [contacts, setContacts] = useLocalStorage('contacts', []);

    const createContacts = (id, name) => {
        setContacts((prevContacts) => {
            return [...prevContacts, { id, name }];
        });
    };

    return (
        <ContactsContext.Provider value={{ contacts, createContacts }}>
            {children}
        </ContactsContext.Provider>
    );
}
