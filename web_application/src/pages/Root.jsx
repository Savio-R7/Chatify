import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { StompSessionProvider } from "react-stomp-hooks";

export default function Root() {
	const { isUserLoggedIn, getToken } = useAuth();

    return (
        <>
            <Navbar />
            <StompSessionProvider url="http://localhost:8080/socket" connectHeaders={{Authorization: `Bearer ${getToken()}`}} reconnectDelay={60000} onStompError={() => console.error("Stomp error")} >
                <Outlet />
            </StompSessionProvider>
        </>
    )
}
