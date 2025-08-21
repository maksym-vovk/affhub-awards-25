import './PasswordButton.scss'
import {RiEye2Line, RiEyeCloseLine} from "react-icons/ri";

function PasswordButton({ isPasswordVisible, setIsPasswordVisible }) {
    return (
        <button
            type="button"
            className="password-button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
            {isPasswordVisible
                ? <RiEyeCloseLine className="password-button__icon" />
                : <RiEye2Line className="password-button__icon" />
            }

        </button>
    )
}

export default PasswordButton
