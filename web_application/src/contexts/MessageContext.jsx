import { createContext, useContext, useCallback, useMemo, useState } from "react";
import { DataStore } from "../utils/StorageProvider";

var defaultMessages = [
]

var messagesInDB = await DataStore.getItem("messages") || defaultMessages;

const MessagesContext = createContext(messagesInDB);

export function useMessages() {
	const messages = useContext(MessagesContext);
	return messages;
}

export function MessageProvider({ children }) {
	const [messages, setMessages] = useState(messagesInDB);

	const addMessage = useCallback((message) => {
        const newMessages = messages.concat([message]);
        setMessages(newMessages);
        DataStore.setItem("messages", newMessages);
    }, []);

    const updateMessage = useCallback((message) => {
        const old_message = messages.find(c => c.id === message.id);
        message = { ...old_message, ...message };
        setMessages(messages.map(c => c.id === message.id ? message : c));
        DataStore.setItem("messages", messages.map(c => c.id === message.id ? message : c));
    }, []);

    const logoutMessages = useCallback(() => {
        setMessages(defaultMessages);
        DataStore.setItem("messages", defaultMessages);
    }, []);

    const value = useMemo(() => ({ messages, addMessage, updateMessage, logout: logoutMessages }), [messages, addMessage, updateMessage, logoutMessages]);

	return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
}
