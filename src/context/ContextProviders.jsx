import {ModalProvider} from "./ModalContext.jsx";

function ContextProviders({ children }) {
    return (
        <ModalProvider>
            {children}
        </ModalProvider>
    )
}

export default ContextProviders
