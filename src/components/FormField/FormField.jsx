import './FormField.scss'
import { useField } from "formik";
import PasswordButton from "../PasswordButton/PasswordButton.jsx";

function FormField({ isPasswordVisible, setIsPasswordVisible, ...props }) {
    const [field, meta] = useField({...props})

    const isError = meta.touched && meta.error
    const isPassword = field.name === "password" || field.name === "repeatPassword";

    return (
        <div className="popup-field">
            <label className="popup-field__label">
                <input
                    className="popup-field__input"
                    {...props}
                    {...field}
                    autoComplete="on"
                />
                {isPassword && (
                    <PasswordButton
                        isPasswordVisible={isPasswordVisible}
                        setIsPasswordVisible={setIsPasswordVisible}
                    />
                )}
            </label>
            <p className={`popup-field__error ${isError ? 'active': ''}`}>{isError ? meta.error : 'Empty'}</p>
        </div>
    )
}

export default FormField
