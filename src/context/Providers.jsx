import {ModalProvider} from "./ModalProvider.jsx";
import {FaqProvider} from "./FaqProvider.jsx";
import {LoaderProvider} from "./LoaderProvider.jsx";

function Providers({ children }) {
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

export default Providers
