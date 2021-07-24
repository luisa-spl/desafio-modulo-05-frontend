import { createContext, useState } from 'react';

export const AuthContext = createContext();

function AuthProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem('TOKEN'));

    return(
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;