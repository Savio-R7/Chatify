import { createContext, useContext, useCallback, useMemo, useState } from "react";
import { DataStore } from "../utils/StorageProvider";

var defaultContact = [
    {
        id: 0,
        name: "ChatIO",
        phone: "1",
        countryCode: 91,
        publicKey: "-----",
        online: true,
        lastSeenAt: new Date(),
    }
]

var contactsInDB = await DataStore.getItem("contacts") || defaultContact;

const ContactsContext = createContext(contactsInDB);

export function useContacts() {
	const contacts = useContext(ContactsContext);
	return contacts;
}

export function ContactProvider({ children }) {
	const [contacts, setContacts] = useState(contactsInDB);

	const addContact = useCallback((contact) => {
        setContacts([...contacts, contact]);
        DataStore.setItem("contacts", [...contacts, contact]);
    }, []);

    const removeContact = useCallback((contact) => {
        setContacts(contacts.filter(c => c.id !== contact.id));
        DataStore.setItem("contacts", contacts.filter(c => c.id !== contact.id));
    }, []);

    const updateContact = useCallback((contact) => {
        const old_contact = contacts.find(c => c.id === contact.id);
        contact = { ...old_contact, ...contact };
        setContacts(contacts.map(c => c.id === contact.id ? contact : c));
        DataStore.setItem("contacts", contacts.map(c => c.id === contact.id ? contact : c));
    }, []);

    const logoutContacts = useCallback(() => {
        setContacts(defaultContact);
        DataStore.setItem("contacts", defaultContact);
    }, []);

    const value = useMemo(() => ({ contacts, addContact, removeContact, updateContact, logout: logoutContacts }), [contacts, addContact, removeContact, updateContact, logoutContacts]);

	return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
}
