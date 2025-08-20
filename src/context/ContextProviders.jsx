import {ModalProvider} from "./ModalContext.jsx";
import {FaqProvider} from "./FaqContext.jsx";
import ModalRoot from "../components/ModalRoot/ModalRoot.jsx";
import FaqModal from "../components/FaqModal/FaqModal.jsx";

function ContextProviders({ children }) {
    return (
        <ModalProvider>
            <FaqProvider>
                {children}
            </FaqProvider>
        </ModalProvider>
    )
}

export default ContextProviders
