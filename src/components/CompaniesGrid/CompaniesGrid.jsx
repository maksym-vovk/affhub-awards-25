import "./CompaniesGrid.scss"
import {useAuth} from "../../context/AuthProvider.jsx";

function CompaniesGrid({ children, disabled }) {
    const { authToken } = useAuth();

    return (
        <div className={`companies ${authToken && disabled ? 'disabled' : ''}`}>
            {authToken && disabled && <p className="companies__message">Ви проголосували в цій номінації за:</p>}
            {children}
        </div>
    )
}

export default CompaniesGrid
