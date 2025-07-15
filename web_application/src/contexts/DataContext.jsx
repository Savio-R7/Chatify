import { createContext, useContext, useCallback, useMemo, useState } from "react";
import { DataStore } from "../utils/StorageProvider";

var defaultData = {
    "user": null,
};

var dataInDB = await DataStore.getItem("data") || defaultData;

const DataContext = createContext(dataInDB);

export function useData() {
	const data = useContext(DataContext);
	return data;
}

export function DataProvider({ children }) {
	const [data, setData] = useState(dataInDB);

	const setDataUser = useCallback((user) => {
        setData({ ...data, "user": user });
        DataStore.setItem("data", { ...data, "user": user });
    }, []);

    const updateDataUser = useCallback((user) => {
        const old_user = data.user;
        user = { ...old_user, ...user };
        setData({ ...data, "user": user });
        DataStore.setItem("data", { ...data, "user": user });
    }, []);

    const logoutData = useCallback(() => {
        setData(defaultData);
        DataStore.removeItem("data");
    }, []);

	const value = useMemo(() => ({ data, setDataUser, updateDataUser, logout: logoutData }), [data, setDataUser, updateDataUser, logoutData]);

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
