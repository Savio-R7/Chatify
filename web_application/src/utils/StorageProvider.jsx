import localforage from "localforage";
import localForage from "localforage";

localForage.config({
    driver: [
        localForage.INDEXEDDB,
        localForage.LOCALSTORAGE,
        localForage.WEBSQL,
    ],
    name: 'ChatIO',
    version: 1.0,
});

export const AuthStore = localforage.createInstance({
    name: "ChatIO",
    storeName: "AuthStore"
});

export const DataStore = localforage.createInstance({
    name: "ChatIO",
    storeName: "DataStore"
});