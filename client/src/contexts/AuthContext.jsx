import React, { useState, createContext } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
