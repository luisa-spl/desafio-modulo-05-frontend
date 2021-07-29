import { createContext, useState } from 'react';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('TOKEN'));

    const setTokenStorage = (token) => {
        localStorage.setItem('TOKEN', token)
        setToken(token)
    }

    return (
        <AuthContext.Provider value={{ token, setToken: setTokenStorage }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;