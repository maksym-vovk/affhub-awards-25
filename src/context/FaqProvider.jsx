import {createContext, useContext, useState} from "react";

export const FaqContext = createContext()

export const FaqProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);

    const closeModal = () => setIsOpen(false);

    return (
        <FaqContext.Provider value={{isOpen, openModal, closeModal}}>
            {children}
        </FaqContext.Provider>
    )
}

export const useFaq = () => useContext(FaqContext)