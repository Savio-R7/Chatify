import { useState } from "react";
import { useData } from "../contexts/DataContext";
import { useMessages } from "../contexts/MessageContext";

export default function ApplicationChat({chat, stompClient}) {
    const { data, setDataUser, updateDataUser } = useData();
    const { messages, addMessage, updateMessage } = useMessages();
    
    const [ msgInput, setMsgInput] = useState("");
    const [msgSendError, setMsgSendError] = useState(null);
    const handleMsgInputChange = (e) => {
        setMsgInput(e.target.value);
    };

    const sendMessage = () => {
        if (stompClient?.connected) {
            stompClient.publish({
                destination: `/socket/app/user/${chat.phone}`,
                body: JSON.stringify({
                    commandType: "MESSAGE",
                    payload: {
                        type: "MESSAGE",
                        message: msgInput,
                        group: chat.name && chat.description ? chat.id : null,
                    }
                }),
            });
            addMessage({
                to: chat.phone,
                from: data.user.phone,
                message: msgInput,
                group: chat.name && chat.description ? chat.id : null,
                createdAt: new Date(),
                read: true
            });
            setMsgInput("");
        } else {
            setMsgSendError("Stomp Client not initialized");
        }
    };
    
	return (
		<>
			{chat ? (
				<>
					<div className="flex flex-row items-center justify-between bg-base-200 h-14 min-h-14 px-6 border-b border-b-black">
						<div className="flex flex-row gap-2 items-center">
							<div className={`avatar ${chat.online ? "online" : "offline"} placeholder w-10 h-10 z-0`}>
								<div className="bg-neutral text-neutral-content w-full rounded-full text-center">
									<span className="text-lg font-semibold">{chat.name[0]}</span>
								</div>
							</div>
							<div className="flex flex-col">
								<div className="font-semibold text-xl">
									{chat.name} {chat.phone == data.user.phone ? "(You)" : ""}
								</div>
								<div className="text-xs opacity-50">{chat?.lastSeenAt?.toLocaleTimeString()}</div>
							</div>
						</div>
						<div className="flex flex-row gap-2">
							<button className="">
								<svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g id="SVGRepo_bgCarrier" strokeWidth={0} />
									<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
									<g id="SVGRepo_iconCarrier">
										{" "}
										<path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75ZM12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z" fill="currentColor" />{" "}
									</g>
								</svg>
							</button>
						</div>
					</div>
					<div id="chatBox" className="grow overflow-y-scroll px-8 py-4">
						{messages
							.filter((message) => message.from == chat?.phone || message.to == chat?.phone)
							.map((message, index) => (
								<div className={`chat ${message.from != data.user.phone ? "chat-start" : "chat-end"}`} key={index}>
									<div className="chat-bubble">{message.message}</div>
									<div className="chat-footer text-xs opacity-50">{message.createdAt?.toLocaleTimeString()}</div>
								</div>
							))}
						{messages.filter((message) => message.from == chat?.phone || message.to == chat?.phone).length == 0 && (
							<div className="flex justify-center items-center h-full w-full gap-2">
								<svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g id="SVGRepo_bgCarrier" strokeWidth={0} />
									<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
									<g id="SVGRepo_iconCarrier">
										{" "}
										<path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 7.75C11.3787 7.75 10.875 8.25368 10.875 8.875C10.875 9.28921 10.5392 9.625 10.125 9.625C9.71079 9.625 9.375 9.28921 9.375 8.875C9.375 7.42525 10.5503 6.25 12 6.25C13.4497 6.25 14.625 7.42525 14.625 8.875C14.625 9.58584 14.3415 10.232 13.883 10.704C13.7907 10.7989 13.7027 10.8869 13.6187 10.9708C13.4029 11.1864 13.2138 11.3753 13.0479 11.5885C12.8289 11.8699 12.75 12.0768 12.75 12.25V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V12.25C11.25 11.5948 11.555 11.0644 11.8642 10.6672C12.0929 10.3733 12.3804 10.0863 12.6138 9.85346C12.6842 9.78321 12.7496 9.71789 12.807 9.65877C13.0046 9.45543 13.125 9.18004 13.125 8.875C13.125 8.25368 12.6213 7.75 12 7.75ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="currentColor" />{" "}
									</g>
								</svg>{" "}
								No messages found
							</div>
						)}
					</div>
					<div className="flex flex-row items-center justify-between bg-base-200 h-14 min-h-14 px-4 gap-2 border-t border-t-black">
						<input type="text" placeholder="Type here" className="input input-bordered w-full h-10 min-h-10" value={msgInput} onChange={handleMsgInputChange} />
						<button className="btn h-10 min-h-10 btn-primary" onClick={sendMessage}>
							Send
						</button>
					</div>
					{msgSendError && <div className="text-xs text-error">{msgSendError}</div>}
				</>
			) : (
				<div className="flex flex-col items-center justify-center h-full w-full">
					<svg viewBox="0 0 24 24" className="w-24 h-24 text-primary" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" strokeWidth={0} />
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
						<g id="SVGRepo_iconCarrier">
							{" "}
							<path d="M9.5 20V22C9.5 22.4142 9.83579 22.75 10.25 22.75C10.6642 22.75 11 22.4142 11 22V20H9.5Z" fill="currentColor" /> <path d="M15 20H13.5V22C13.5 22.4142 13.8358 22.75 14.25 22.75C14.6642 22.75 15 22.4142 15 22V20Z" fill="currentColor" /> <path fillRule="evenodd" clipRule="evenodd" d="M17.3846 6.58471L17.6407 6.53344C18.0564 6.45022 18.4863 6.48995 18.8814 6.64813C19.5717 6.92453 20.3266 6.97616 21.0458 6.79618L21.1073 6.7808C21.6309 6.64975 22 6.16299 22 5.60336V3.47284C22 2.73503 21.3358 2.19145 20.6454 2.36421C20.249 2.46342 19.8329 2.43496 19.4523 2.28261L19.3793 2.25335C18.7422 1.99828 18.0491 1.93421 17.3787 2.06841L16.93 2.15824C16.3901 2.26632 16 2.75722 16 3.32846V10.2807C16 10.678 16.31 11 16.6923 11C17.0747 11 17.3846 10.678 17.3846 10.2807V6.58471Z" fill="currentColor" /> <path d="M14.5 6V10.2807C14.5 11.4518 15.428 12.5 16.6923 12.5C17.9566 12.5 18.8846 11.4518 18.8846 10.2807V8.22795C19.6455 8.43335 20.4446 8.45735 21.22 8.29496C21.7122 9.13671 22 10.1541 22 11.25V17.4253C22 18.8473 21.0119 20 19.7931 20H12.5V11.25C12.5 9.22014 11.6679 7.27604 10.2826 6H14.5Z" fill="currentColor" /> <path fillRule="evenodd" clipRule="evenodd" d="M2 11.25C2 8.35051 4.01472 6 6.5 6C8.98528 6 11 8.35051 11 11.25V20H4.23256C2.99955 20 2 18.8339 2 17.3953V11.25ZM4.25 16C4.25 15.5858 4.58579 15.25 5 15.25H8C8.41421 15.25 8.75 15.5858 8.75 16C8.75 16.4142 8.41421 16.75 8 16.75H5C4.58579 16.75 4.25 16.4142 4.25 16Z" fill="currentColor" />{" "}
						</g>
					</svg>
					<div className="text-xl font-semibold mt-2">Select a chat to start messaging</div>
					<div className="flex flex-row gap-2">
						<svg viewBox="0 0 24 24" className="h-6 w-6 text-success" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="SVGRepo_bgCarrier" strokeWidth={0} />
							<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
							<g id="SVGRepo_iconCarrier">
								{" "}
								<path fillRule="evenodd" clipRule="evenodd" d="M3.37752 5.08241C3 5.62028 3 7.21907 3 10.4167V11.9914C3 17.6294 7.23896 20.3655 9.89856 21.5273C10.62 21.8424 10.9807 22 12 22C13.0193 22 13.38 21.8424 14.1014 21.5273C16.761 20.3655 21 17.6294 21 11.9914V10.4167C21 7.21907 21 5.62028 20.6225 5.08241C20.245 4.54454 18.7417 4.02996 15.7351 3.00079L15.1623 2.80472C13.595 2.26824 12.8114 2 12 2C11.1886 2 10.405 2.26824 8.83772 2.80472L8.26491 3.00079C5.25832 4.02996 3.75503 4.54454 3.37752 5.08241ZM15.0595 10.4995C15.3353 10.1905 15.3085 9.71642 14.9995 9.44055C14.6905 9.16467 14.2164 9.19151 13.9405 9.50049L10.9286 12.8739L10.0595 11.9005C9.78358 11.5915 9.30947 11.5647 9.00049 11.8405C8.69151 12.1164 8.66467 12.5905 8.94055 12.8995L10.3691 14.4995C10.5114 14.6589 10.7149 14.75 10.9286 14.75C11.1422 14.75 11.3457 14.6589 11.488 14.4995L15.0595 10.4995Z" fill="currentColor" />{" "}
							</g>
						</svg>
						End to end encrypted
					</div>
				</div>
			)}
		</>
	);
}
