import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useMessages } from "../contexts/MessageContext";
import { useContacts } from "../contexts/ContactContext";
import { useGroups } from "../contexts/GroupContext";
import { useData } from "../contexts/DataContext";


const useAxios = () => {
    const navigate = useNavigate();
	const { getToken, logout } = useAuth();
    const { logoutMessages } = useMessages();
    const { logoutContacts } = useContacts();
    const { logoutGroups } = useGroups();
    const { logoutData } = useData();

	const api = axios.create({
		baseURL: "http://localhost:8080/",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${getToken()}`,
		},
	});

	useEffect(() => {
		const requestInterceptor = api.interceptors.request.use((config) => {
			if (!config.headers.Authorization && getToken()) {
				config.headers.Authorization = `Bearer ${getToken()}`;
			}
			return config;
		});

		const responseInterceptor = api.interceptors.response.use(
			(response) => response,
			(error) => {
                if (error.request.status == 403) {
                    logout();
                    logoutMessages();
                    logoutContacts();
                    logoutGroups();
                    logoutData();
                    navigate("/");
                }
				return Promise.reject(error);
			}
		);

		return () => {
			api.interceptors.request.eject(requestInterceptor);
			api.interceptors.response.eject(responseInterceptor);
		};
	});
	return api;
};

export default useAxios;