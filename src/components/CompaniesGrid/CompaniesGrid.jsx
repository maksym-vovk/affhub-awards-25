import "./CompaniesGrid.scss"
import {useAuth} from "../../context/AuthProvider.jsx";

function CompaniesGrid({ children, disabled }) {
    const { authToken } = useAuth();

    return (
        <div className={`companies ${authToken && disabled ? 'disabled' : ''}`}>
            {children}
        </div>
    )
}

export default CompaniesGrid
