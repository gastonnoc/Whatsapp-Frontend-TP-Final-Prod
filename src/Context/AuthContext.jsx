import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const isAuthenticatedInitialState = sessionStorage.getItem('authorization_token');
    const [isAuthenticatedState, setIsAutheticatedState] = useState(isAuthenticatedInitialState);
    const [userData, setUserData] = useState(null); // Nueva variable de estado para el usuario

    useEffect(() => {
        const token = sessionStorage.getItem('authorization_token');
        if (token) {
            setIsAutheticatedState(true);
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUserData(JSON.parse(storedUser));
            }
        }
    }, []);

    const logout = () => {
        sessionStorage.removeItem('authorization_token');
        localStorage.removeItem('user');
        setIsAutheticatedState(false);
        setUserData(null); // Limpiar datos del usuario
    };

    const login = (authorization_token) => {
        sessionStorage.setItem('authorization_token', authorization_token);
        setIsAutheticatedState(true);
    };

    const setUser = (user) => {
        setUserData(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    return (
        <AuthContext.Provider value={{ isAuthenticatedState, userData, logout, login, setUserData: setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
