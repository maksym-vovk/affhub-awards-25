import './FaqButton.scss'
import Button from "../Button/Button.jsx";
import {useTranslation} from "react-i18next";
import {useFaq} from "../../context/FaqProvider.jsx";

function FaqButton() {
    const { t } = useTranslation();
    const { openModal } = useFaq();

    return (
        <Button
            className="popup__faq button"
            onClick={() => openModal()}
        >
            {t('modal.buttons.faq')}
        </Button>
    )
}

export default FaqButton
