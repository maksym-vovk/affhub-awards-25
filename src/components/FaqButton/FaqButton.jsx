import './FaqButton.scss'
import Button from "../Button/Button.jsx";
import {useTranslation} from "react-i18next";

function FaqButton() {
    const { t } = useTranslation();

    return (
        <Button
            className="popup__faq button"
        >
            {t('modal.buttons.faq')}
        </Button>
    )
}

export default FaqButton
