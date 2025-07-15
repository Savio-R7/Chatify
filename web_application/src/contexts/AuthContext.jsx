import { createContext, useContext, useCallback, useMemo, useState } from "react";
import { AuthStore, DataStore } from "../utils/StorageProvider";

import CryptoJS from "crypto-js";

var defaultAuth = { token: null, password: null, public_key: null, private_key: null };
var authInDB = (await AuthStore.getItem("auth")) || defaultAuth;

const AuthContext = createContext(authInDB);

export function useAuth() {
	const auth = useContext(AuthContext);
	return auth;
}

export function AuthProvider({ children }) {
	const [auth, setAuth] = useState(authInDB);
	const [livePassword, setLivePassword] = useState(null);
    

	const setToken = useCallback((token) => {
		if (auth.password) {
			const hashedPassword = CryptoJS.SHA256(livePassword).toString(CryptoJS.enc.Base64);
			if (livePassword && hashedPassword == auth.password) {
				const encryptedToken = CryptoJS.AES.encrypt(token, livePassword).toString();
				setAuth({ ...auth, token: encryptedToken });
				AuthStore.setItem("auth", { ...auth, token: encryptedToken });
			} else {
				throw new Error("Password not provided");
			}
		}
		setAuth({ ...auth, token });
		AuthStore.setItem("auth", { ...auth, token });
	});

	const setPassword = useCallback((current_password, new_password) => {
		if (auth.password) {
			const hashedCurrentPassword = CryptoJS.SHA256(current_password).toString(CryptoJS.enc.Base64);
			if (hashedCurrentPassword != auth.password) {
				throw new Error("Invalid password");
			}
			const token = CryptoJS.AES.decrypt(auth.token, livePassword).toString(CryptoJS.enc.Utf8);
			const public_key = CryptoJS.AES.decrypt(auth.public_key, livePassword).toString(CryptoJS.enc.Utf8);
			const private_key = CryptoJS.AES.decrypt(auth.private_key, livePassword).toString(CryptoJS.enc.Utf8);
			const hashedNewPassword = CryptoJS.SHA256(new_password).toString(CryptoJS.enc.Base64);
			const encryptedToken = CryptoJS.AES.encrypt(token, new_password).toString();
			const encryptedPublicKey = CryptoJS.AES.encrypt(public_key, new_password).toString();
			const encryptedPrivateKey = CryptoJS.AES.encrypt(private_key, new_password).toString();
			setLivePassword(new_password);
			setAuth({ token: encryptedToken, password: hashedNewPassword, public_key: encryptedPublicKey, private_key: encryptedPrivateKey });
			AuthStore.setItem("auth", { token: encryptedToken, password: hashedNewPassword, public_key: encryptedPublicKey, private_key: encryptedPrivateKey });
		} else {
			const token = auth.token;
			const public_key = auth.public_key;
			const private_key = auth.private_key;
			const hashedNewPassword = CryptoJS.SHA256(new_password).toString(CryptoJS.enc.Base64);
			const encryptedToken = CryptoJS.AES.encrypt(token, new_password).toString();
			const encryptedPublicKey = CryptoJS.AES.encrypt(public_key, new_password).toString();
			const encryptedPrivateKey = CryptoJS.AES.encrypt(private_key, new_password).toString();
			setLivePassword(new_password);
			setAuth({ token: encryptedToken, password: hashedNewPassword, public_key: encryptedPublicKey, private_key: encryptedPrivateKey });
			AuthStore.setItem("auth", { token: encryptedToken, password: hashedNewPassword, public_key: encryptedPublicKey, private_key: encryptedPrivateKey });
		}
	});

	const setKeys = useCallback((public_key, private_key) => {
		if (auth.password) {
			const hashedPassword = CryptoJS.SHA256(livePassword).toString(CryptoJS.enc.Base64);
			if (livePassword && hashedPassword == auth.password) {
				const encryptedPublicKey = CryptoJS.AES.encrypt(public_key, livePassword).toString();
				const encryptedPrivateKey = CryptoJS.AES.encrypt(private_key, livePassword).toString();
				setAuth({ ...auth, public_key: encryptedPublicKey, private_key: encryptedPrivateKey });
				AuthStore.setItem("auth", { ...auth, public_key: encryptedPublicKey, private_key: encryptedPrivateKey });
			} else {
				throw new Error("Invalid password");
			}
		}
		setAuth({ ...auth, public_key, private_key });
		AuthStore.setItem("auth", { ...auth, public_key, private_key });
	});

    const decryptData = useCallback((password) => {
        if (auth.password) {
            const hashedPassword = Crypto.SHA256(password).toString(Crypto.enc.Base64);
            if (hashedPassword == auth.password) {
                setLivePassword(password);
            } else {
                throw new Error("Invalid password");
            }
        }
    });

	const getToken = useCallback(() => {
		if (auth.token) {
			if (auth.password) {
				if (livePassword) {
					const token = CryptoJS.AES.decrypt(auth.token, livePassword).toString(CryptoJS.enc.Utf8);
					return token;
				} else {
					throw new Error("Password not provided");
				}
			}
			return auth.token;
		}
		return null;
	});

	const getKeys = useCallback(() => {
		if (auth.public_key && auth.private_key) {
			if (auth.password) {
				if (livePassword) {
					const public_key = CryptoJS.AES.decrypt(auth.public_key, livePassword).toString(CryptoJS.enc.Utf8);
					const private_key = CryptoJS.AES.decrypt(auth.private_key, livePassword).toString(CryptoJS.enc.Utf8);
					return { public_key, private_key };
				} else {
					throw new Error("Password not provided");
				}
			}
			return { public_key: auth.public_key, private_key: auth.private_key };
		}
		return null;
	});

    const isPasswordProtected = useCallback(() => {
        return auth.password ? true : false;
    });

    const isDecrypted = useCallback(() => {
        return livePassword ? true : false;
    });

    const isUserLoggedIn = useCallback(() => {
        return auth.token ? true : false;
    });

	const logout = useCallback(() => {
		setAuth(defaultAuth);
		AuthStore.removeItem("auth");
        setLivePassword(null);
	}, []);

	const value = useMemo(() => ({ decryptData, setToken, setKeys, setPassword, getToken, getKeys, isPasswordProtected, isDecrypted, isUserLoggedIn, logout }), [decryptData, setToken, setKeys, setPassword, getToken, getKeys, isPasswordProtected, isDecrypted, isUserLoggedIn, logout]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
