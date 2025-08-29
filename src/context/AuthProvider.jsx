import {createContext, useContext, useEffect, useState} from "react";
import {authApi} from "../api/auth.js";
import {useTranslation} from "react-i18next";

export const AuthContext = createContext(undefined)

const TOKEN_KEY = "authToken"
const USER_KEY = "currentUser"

function getStoredToken() {
    try {
        return localStorage.getItem(TOKEN_KEY)
    } catch (error) {
        console.warn('Failed to get token from localStorage:', error)
        return null
    }
}

function getStoredUser() {
    try {
        const user = localStorage.getItem(USER_KEY)
        return user ? JSON.parse(user) : null
    } catch (error) {
        console.warn('Failed to get user from localStorage:', error)
        return null
    }
}

function setStoredAuth(token, user) {
    try {
        if (token && user) {
            localStorage.setItem(TOKEN_KEY, token)
            localStorage.setItem(USER_KEY, JSON.stringify(user))
        } else {
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem(USER_KEY)
        }
    } catch (error) {
        console.warn('Failed to store auth data:', error)
    }
}

function validateJWTToken(token) {
    try {
        // Split JWT token into parts
        const parts = token.split('.')
        if (parts.length !== 3) {
            return false
        }

        // Decode payload (middle part)
        const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))

        // Check expiration
        const now = Math.floor(Date.now() / 1000)
        if (payload.exp && payload.exp < now) {
            return false
        }

        // Check issued at (optional)
        if (payload.iat && payload.iat > now) {
            return false
        }

        return true
    } catch (error) {
        console.error('JWT validation error:', error)
        return false
    }
}


export default function AuthProvider({ children }) {
    const { t } = useTranslation()
    const [authToken, setAuthToken] = useState(() => getStoredToken())
    const [currentUser, setCurrentUser] = useState(() => getStoredUser())
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        setStoredAuth(authToken, currentUser)
    }, [authToken, currentUser])

    useEffect(() => {
        if (authToken && currentUser) {
            try {
                if (!validateJWTToken(authToken)) {
                    console.warn("Stored token is invalid, logging out");
                    handleLogout();
                }
            } catch (error) {
                console.warn("Token validation error:", error);
                handleLogout();
            }
        }
        setInitialized(true);
    }, [authToken, currentUser]);


    async function handleLogin(data) {
        try {
            const isOtpLogin = Boolean(data.requestId);

            const response = isOtpLogin
                ? await authApi.verifyEmail(data, t)
                : await authApi.login(data, t);

            if (response.error) {
                if (!isOtpLogin && response.data?.code) {
                    localStorage.setItem("requestId", response.data.code);
                }
                throw response;
            }

            const { token, user } = response.data

            setAuthToken(token)
            setCurrentUser(user)

            return {
                message: response.message
            }
        } catch (error) {
            setAuthToken(null)
            setCurrentUser(null)
            throw error
        }
    }

    function handleLogout() {
        setAuthToken(null)
        setCurrentUser(null)
    }

    return (
        <AuthContext.Provider value={{
            authToken,
            currentUser,
            handleLogin,
            handleLogout,
            initialized,
            isAuthenticated: !!authToken && !!currentUser
        }}>
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
