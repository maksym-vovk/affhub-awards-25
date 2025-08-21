import {ModalProvider} from "./ModalContext.jsx";
import {FaqProvider} from "./FaqContext.jsx";
import {LoaderProvider} from "./LoaderContext.jsx";

function ContextProviders({ children }) {
    return (
        <LoaderProvider>
            <ModalProvider>
                <FaqProvider>
                    {children}
                </FaqProvider>
            </ModalProvider>
        </LoaderProvider>
    )
}

export default ContextProviders
