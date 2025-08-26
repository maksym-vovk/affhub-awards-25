import {ModalProvider} from "./ModalProvider.jsx";
import {FaqProvider} from "./FaqProvider.jsx";
import {LoaderProvider} from "./LoaderProvider.jsx";
import AuthProvider from "./AuthProvider.jsx";

function Providers({ children }) {
    return (
        <AuthProvider>
            <LoaderProvider>
                <ModalProvider>
                    <FaqProvider>
                        {children}
                    </FaqProvider>
                </ModalProvider>
            </LoaderProvider>
        </AuthProvider>
    )
}

export default Providers
