import {createContext, useContext, useRef, useState} from "react";
import Loader from "../components/Loader/Loader.jsx";

export const LoaderContext = createContext()

export const LoaderProvider = ({ children }) => {
    const [count, setCount] = useState(0)
    const [visible, setVisible] = useState(false)
    const timerRef = useRef(null)

    const showLoader = () => {
        setCount(count => count + 1)

        if (!visible) {
            timerRef.current = setTimeout(() => setVisible(true), 0)
        }
    }

    const hideLoader = () => {
        setCount(count => Math.max(count - 1, 0))
    }

    if (count === 0 && visible) {
        clearTimeout(timerRef.current)
        setTimeout(() => setVisible(false), 600);
    }

    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader }}>
            {visible && <Loader count={count}/>}
            {children}
        </LoaderContext.Provider>
    )
}

export const useLoader = () => useContext(LoaderContext)