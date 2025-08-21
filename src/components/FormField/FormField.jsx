import './FormField.scss'
import { useField } from "formik";
import PasswordButton from "../PasswordButton/PasswordButton.jsx";

function FormField({ isPasswordVisible, setIsPasswordVisible, ...props }) {
    const [field, meta] = useField({...props})

    const isError = meta.touched && meta.error
    const isPassword = field.name === "password" || field.name === "repeatPassword";

    return (
        <div className={`popup-field ${isPassword ? 'popup-field--password' : ''}`}>
            <div className="popup-field__wrapper">
                <input
                    className={`popup-field__input ${isError ? 'popup-field__input--error': ''}`}
                    {...props}
                    {...field}
                    autoComplete="on"
                    aria-label={props.placeholder || "Input field"}
                />
                {isPassword && (
                    <PasswordButton
                        isPasswordVisible={isPasswordVisible}
                        setIsPasswordVisible={setIsPasswordVisible}
                    />
                )}
            </div>
            <p className={`popup-field__error ${isError ? 'active': ''}`}>{isError ? meta.error : 'Empty'}</p>
        </div>
    )
}

export default FormField
