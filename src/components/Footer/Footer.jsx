import "./Footer.scss"
import {useTranslation} from "react-i18next";

function Footer() {
    const { t } = useTranslation()

    return (
        <footer className="footer">
            <div className="footer__wrapper container">
                <p className="footer__text">
                    {t('footer.text')}
                </p>
            </div>
        </footer>
    )
}

export default Footer
