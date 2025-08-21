import {createContext, useContext, useState} from "react";

export const LoaderContext = createContext()

export const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)

    const setLoadingWithDelay = (newLoadingState) => {
        if (newLoadingState) {
            setLoading(true);
        } else {
            setTimeout(() => setLoading(false), 1000);
        }
    };

    return (
        <LoaderContext.Provider value={[loading, setLoadingWithDelay]}>
            { children }
        </LoaderContext.Provider>
    )
}

export const useLoader = () => useContext(LoaderContext)