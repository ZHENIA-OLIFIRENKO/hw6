import React, { createContext, useContext, useState } from 'react';

const ViewModeContext = createContext();

export const useViewMode = () => useContext(ViewModeContext);

const ViewModeProvider = ({ children }) => {
    const [viewMode, setViewMode] = useState('table');

    const toggleViewMode = () => {
        setViewMode((prevMode) => (prevMode === 'table' ? 'card' : 'table'));
    };

    return (
        <ViewModeContext.Provider value={{ viewMode, toggleViewMode }}>
            {children}
        </ViewModeContext.Provider>
    );
};

export { ViewModeProvider };
