import {createContext, useCallback, useContext, useState} from "react";

export const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState({
        isOpen: false,
        type: 'login',
        props: {}
    });

    const openModal = useCallback((type, props = {}) => {
        setModal({ isOpen: true, type, props });
    }, []);

    const closeModal = useCallback(() => {
        setModal({ isOpen: false, type: null, props: {} });
    }, []);

    const changeModalType = useCallback((type) => {
        setModal((prev) => ({ ...prev, type }));
    }, []);

    return (
        <ModalContext.Provider value={{ ...modal, openModal, closeModal, changeModalType }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext);