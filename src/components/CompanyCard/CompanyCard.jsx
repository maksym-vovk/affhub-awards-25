import './CompanyCard.scss'
import {useTranslation} from "react-i18next";
import Button from "../Button/Button.jsx";
import {useModal} from "../../context/ModalProvider.jsx";
import {useAuth} from "../../context/AuthProvider.jsx";
import {authApi} from "../../api/auth.js";

function CompanyCard({ company }) {
    const { t } = useTranslation();
    const { openModal } = useModal()
    const { authToken } = useAuth()

    const imgSrc = `/assets/${company.logo}`
    const imgElement = <img className="company__logo" src={imgSrc} alt={company.name} /> || null

    async function handleVote() {
        if (!authToken) openModal('login')

        await authApi.checkPhoneVerification(authToken)
    }

    return (
        <div className="company" data-company={company.tag}>
            <div className="company__body">
                {
                    company.link
                        ? <a className="company__img" href={company.link} target="_blank">{imgElement}</a>
                        : imgElement
                }
                <span className="company__name">{company.name}</span>
                <div className="company__desc-wrapper company__desc-wrapper--shadow_bottom">
                    <p className="company__desc">{company.desc}</p>
                </div>
                <Button
                    className="company__button button"
                    onClick={handleVote}
                >
                    {t('common.voteButton')}
                </Button>
                <span className="company__votes">{company.percent.toFixed(2)}</span>
            </div>
        </div>
    )
}

export default CompanyCard
