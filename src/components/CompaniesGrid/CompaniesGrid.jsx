import "./CompaniesGrid.scss"
import {useAuth} from "../../context/AuthProvider.jsx";
import {useTranslation} from "react-i18next";

function CompaniesGrid({ children, disabled }) {
    const { t } = useTranslation();
    const { authToken } = useAuth();

    return (
        <div className={`companies ${authToken && disabled ? 'disabled' : ''}`}>
            {authToken && disabled && (
                <p className="companies__message">
                    {t('companies.votedMsg')}
                </p>
            )}
            {children}
        </div>
    )
}

export default CompaniesGrid
