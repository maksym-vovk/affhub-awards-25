import "./ModalRoot.scss"
import {useModal} from "../../context/ModalContext.jsx";

import logo from '/assets/main-logo.svg'
import Button from "../Button/Button.jsx";
import SignupForm from "../SignupForm/SignupForm.jsx";
import LoginForm from "../LoginForm/LoginForm.jsx";
import OtpForm from "../OtpForm/OtpForm.jsx";
import SocialForm from "../SocialForm/SocialForm.jsx";
import FormError from "../FormError/FormError.jsx";

function ModalRoot() {
    const { isOpen, type, closeModal } = useModal()

    // if (!isOpen) return null;

    const MODAL_COMPONENTS = {
        login: <LoginForm />,
        signup: <SignupForm />,
        emailOtp: <OtpForm />,
        phoneOtp: <OtpForm />,
        socialVerification: <SocialForm />,
        error: <FormError />,
    }

    return (
        <div
            className={`popup ${isOpen ? 'active' : ''}`}
        >
            <div className="container">
                <div className="popup__wrapper">
                    <div className="popup__header">
                        <img src={logo} alt="Affhub logo" width='110' height='25' className="popup__logo logo"/>
                        <Button className="popup__close" onClick={closeModal}/>
                    </div>
                    <div className="popup__body">
                        <div className="popup__block">
                            {MODAL_COMPONENTS[type] || null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalRoot
