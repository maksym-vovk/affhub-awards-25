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

    const closeModalWithDelay = useCallback((delay = 3000) => {
        setTimeout(() => closeModal(), delay);
    }, []);

    const changeModalType = useCallback((type, props) => {
        setModal((prev) => ({ ...prev, type, props }));
    }, []);

    const changeModalTypeWithDelay = useCallback((type, props, delay = 3000) => {
        setTimeout(() => changeModalType(type, props), delay);
    }, []);

    return (
        <ModalContext.Provider value={{
            ...modal,
            openModal,
            closeModal,
            closeModalWithDelay,
            changeModalType,
            changeModalTypeWithDelay
        }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext);