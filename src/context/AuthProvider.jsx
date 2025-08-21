import {createContext, useContext, useState} from "react";

export const AuthContext = createContext(undefined)

export default function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState()
    const [currentUser, setCurrentUser] = useState()

    async function handleLogin() {
        try {

        } catch (error) {

        }
    }

    return (
        <AuthContext.Provider value={{  }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context= useContext(AuthContext)

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context
}
