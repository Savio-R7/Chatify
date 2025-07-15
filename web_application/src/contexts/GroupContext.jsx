import { createContext, useContext, useCallback, useMemo, useState } from "react";
import { DataStore } from "../utils/StorageProvider";

var defaultGroup = [
]

var groupsInDB = await DataStore.getItem("groups") || defaultGroup;

const GroupsContext = createContext(groupsInDB);

export function useGroups() {
	const groups = useContext(GroupsContext);
	return groups;
}

export function GroupProvider({ children }) {
	const [groups, setGroups] = useState(groupsInDB);

	const addGroup = useCallback((group) => {
        setGroups([...groups, group]);
        DataStore.setItem("groups", [...groups, group]);
    }, []);

    const removeGroup = useCallback((group) => {
        setGroups(groups.filter(c => c.id !== group.id));
        DataStore.setItem("groups", groups.filter(g => g.id !== group.id));
    }, []);

    const updateGroup = useCallback((group) => {
        const old_group = groups.find(g => g.id === group.id);
        group = { ...old_group, ...group };
        setGroups(groups.map(g => g.id === group.id ? group : g));
        DataStore.setItem("groups", groups.map(g => g.id === group.id ? group : g));
    }, []);

    const logoutGroups = useCallback(() => {
        setGroups(defaultGroup);
        DataStore.setItem("groups", defaultGroup);
    }, []);

    const value = useMemo(() => ({ groups, addGroup, removeGroup, updateGroup, logout: logoutGroups }), [groups, addGroup, removeGroup, updateGroup, logoutGroups]);

	return <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>;
}
