import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useData } from "../contexts/DataContext";
import { useContacts } from "../contexts/ContactContext";
import { useGroups } from "../contexts/GroupContext";
import { useMessages } from "../contexts/MessageContext";
import { useAuth } from "../contexts/AuthContext";

import useAxios from "../hooks/AxiosHooks";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import ApplicationList from "../components/ApplicationList";
import ApplicationChat from "../components/ApplicationChat";

export default function Application() {
    const navigate = useNavigate();
    const axios = useAxios();

	const { isPasswordProtected, isDecrypted, isUserLoggedIn, logout } = useAuth();
	const { data, setDataUser, updateDataUser, logoutData } = useData();
    const { contacts, addContact, updateContact, removeContact, logoutContacts } = useContacts();
    const { groups, addGroup, updateGroup, removeGroup, logoutGroups } = useGroups();
    const { messages, addMessage, updateMessage, logoutMessages } = useMessages();

    const stompClient = isUserLoggedIn() ? useStompClient() : null; 

    useEffect(() => {
        axios.get("/user")
        .then((res) => {
            if (res.data) {
                setDataUser(res.data);
            } else {
                throw new Error("User not found");
            }
        })
        .catch((err) => {
            logout();
            logoutContacts();
            logoutGroups();
            logoutMessages();
            logoutData();
            navigate("/");
            return;
        });
        if (stompClient?.connected) {
            stompClient.subscribe(`/queue/${data?.user?.phone}`, (message) =>  {
                const msg = JSON.parse(message.body);
                msg.read = false;
                addMessage(msg);
            });
        }
    }, []);

	const tabs = [
        {
            name: "Contacts",
            add: addContact,
            update: updateContact,
            remove: removeContact
        },
        {
            name: "Groups",
            add: addGroup,
            update: updateGroup,
            remove: removeGroup
        },
    ];

	const [chat, setChat] = useState(null);

	return (
		<div className="drawer lg:drawer-open">
			<input id="chatsDrawer" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col h-[calc(100vh-3.5rem)]">
				<div className="h-full w-full flex flex-col">
					<ApplicationChat chat={chat} stompClient={stompClient} />
				</div>
				<label htmlFor="chatsDrawer" aria-label="Open Chats" className="lg:hidden btn btn-circle btn-outline btn-primary fixed right-6 bottom-16">
					<svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" strokeWidth={0} />
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
						<g id="SVGRepo_iconCarrier">
							{" "}
							<path d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z" fill="currentColor" /> <path fillRule="evenodd" clipRule="evenodd" d="M2 8C2 8.49355 2.99294 8.89073 4.97883 9.68508L7.7873 10.8085C9.77318 11.6028 10.7661 12 12 12C13.2339 12 14.2268 11.6028 16.2127 10.8085L19.0212 9.68508C21.0071 8.89073 22 8.49355 22 8C22 7.50645 21.0071 7.10927 19.0212 6.31492L16.2127 5.19153C14.2268 4.39718 13.2339 4 12 4C10.7661 4 9.77318 4.39718 7.7873 5.19153L4.97883 6.31492C2.99294 7.10927 2 7.50645 2 8Z" fill="currentColor" /> <path d="M19.0212 13.6851L16.2127 14.8085C14.2268 15.6028 13.2339 16 12 16C10.7661 16 9.77318 15.6028 7.7873 14.8085L4.97883 13.6851C2.99294 12.8907 2 12.4935 2 12C2 11.5551 2.80681 11.1885 4.42043 10.5388L7.56143 11.7952C9.41007 12.535 10.572 13 12 13C13.428 13 14.5899 12.535 16.4386 11.7952L19.5796 10.5388C21.1932 11.1885 22 11.5551 22 12C22 12.4935 21.0071 12.8907 19.0212 13.6851Z" fill="currentColor" /> <path d="M19.0212 17.6849L16.2127 18.8083C14.2268 19.6026 13.2339 19.9998 12 19.9998C10.7661 19.9998 9.77318 19.6026 7.7873 18.8083L4.97883 17.6849C2.99294 16.8905 2 16.4934 2 15.9998C2 15.5549 2.80681 15.1883 4.42043 14.5386L7.56143 15.795C9.41007 16.5348 10.572 16.9998 12 16.9998C13.428 16.9998 14.5899 16.5348 16.4386 15.795L19.5796 14.5386C21.1932 15.1883 22 15.5549 22 15.9998C22 16.4934 21.0071 16.8905 19.0212 17.6849Z" fill="currentColor" />{" "}
						</g>
					</svg>
				</label>
			</div>
			<div className="drawer-side lg:h-[calc(100vh-3.5rem)] border-r border-r-black">
				<label htmlFor="chatsDrawer" aria-label="Close Chats" className="drawer-overlay"></label>
				<ul className="bg-base-200 min-h-full w-80 p-2">
					<ApplicationList tabs={tabs} chat={chat} setChat={setChat} /> 
				</ul>
			</div>
		</div>
	);
}
