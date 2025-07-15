import React from 'react';

import { AuthProvider } from './AuthContext';
import { DataProvider } from './DataContext';
import { ContactProvider } from './ContactContext';
import { GroupProvider } from './GroupContext';
import { MessageProvider } from './MessageContext';

const providers = [
    AuthProvider,
    DataProvider,
    ContactProvider,
    GroupProvider,
    MessageProvider,
];

const combineProviders = (providers) => {
    return providers.reduce((Combined, Provider) => {
        return ({ children }) => (
            <Combined>
                <Provider>
                    {children}
                </Provider>
            </Combined>
        );
    }, ({ children }) => <>{children}</>);
};

const CombinedProviders = combineProviders(providers);

const ContextWrapper = ({ children }) => {
    return (
        <CombinedProviders>
            {children}
        </CombinedProviders>
    );
};

export default ContextWrapper;