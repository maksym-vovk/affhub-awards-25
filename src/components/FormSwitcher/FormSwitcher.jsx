import './FormSwitcher.scss'
import Button from "../Button/Button.jsx";
import {useTranslation} from "react-i18next";
import {useModal} from "../../context/ModalContext.jsx";

function FormSwitcher() {
    const { t } = useTranslation();
    const { type, changeModalType } = useModal()

    return (
        <div className="auth-switcher">
            <Button
                className={`auth-switcher__btn ${type === 'login' ? 'active' : ''}`}
                onClick={() => changeModalType('login')}
            >
                {t('modal.switcher.login')}
            </Button>
            <Button
                className={`auth-switcher__btn ${type === 'signup' ? 'active' : ''}`}
                onClick={() => changeModalType('signup')}
            >
                {t('modal.switcher.signup')}
            </Button>
        </div>
    )
}

export default FormSwitcher
