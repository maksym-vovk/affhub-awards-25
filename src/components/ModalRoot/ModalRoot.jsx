import "./ModalRoot.scss"
import {useModal} from "../../context/ModalProvider.jsx";

import logo from '/assets/main-logo.svg'
import logoMin from '/assets/logo-min.svg'
import Button from "../Button/Button.jsx";
import SignupForm from "../SignupForm/SignupForm.jsx";
import LoginForm from "../LoginForm/LoginForm.jsx";
import OtpForm from "../OtpForm/OtpForm.jsx";
import SocialForm from "../SocialForm/SocialForm.jsx";
import FormMessage from "../FormMessage/FormMessage.jsx";
import React from "react";

function ModalRoot() {
    const { isOpen, type, props, closeModal } = useModal()

    const MODAL_COMPONENTS = {
        login: <LoginForm />,
        signup: <SignupForm />,
        emailOtp: <OtpForm {...props}/>,
        phoneOtp: <OtpForm {...props}/>,
        socialVerification: <SocialForm />,
        message: <FormMessage {...props}/>,
    }

    return (
        <div
            className={`popup ${isOpen ? 'active' : ''}`}
        >
            <div className="container">
                <div className="popup__wrapper">
                    <div className="popup__header">
                        <picture>
                            <source srcSet={logo} media="(min-width: 375px)" />
                            <img src={logoMin} alt="Affhub logo" width='110' height='25' className="popup__logo logo" />
                        </picture>
                        <Button className="popup__close" onClick={closeModal}/>
                    </div>
                    <div className="popup__body">
                        <div className="popup__block">
                            {isOpen ? MODAL_COMPONENTS[type] || null : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalRoot
