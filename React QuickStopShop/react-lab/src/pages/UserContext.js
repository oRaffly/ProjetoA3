import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState(''); // Nome do usuário logado

    const updateUserName = (newUserName) => {
        setUserName(newUserName);
    };

    return (
        <UserContext.Provider value={{ userName, updateUserName }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};