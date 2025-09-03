import './FormField.scss'
import { useField } from "formik";
import PasswordButton from "../PasswordButton/PasswordButton.jsx";
import {useState} from "react";

function FormField({ ...props }) {
    const [field, meta] = useField({...props})
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isError = meta.touched && meta.error
    const isPassword = field.name === "password" || field.name === "repeatPassword";

    function handleNonSpacesInput(e) {
        e.target.value = e.target.value.trim();
    }

    function handlePhoneInput(e) {
        const raw = e.target.value;
        let cleaned = raw.replace(/[^\d]/g, '');

        if (cleaned === '') {
            e.target.value = '';
            return;
        }

        if (!cleaned.startsWith('+')) {
            cleaned = '+' + cleaned.replace(/^\+?/, '');
        }

        e.target.value = cleaned;
    }

    function handleOtpInput(e) {
        const raw = e.target.value;
        e.target.value = raw.replace(/[^\d]/g, '');
    }

    function handleInput(event) {
        switch (field.name) {
            case 'phoneNumber': handlePhoneInput(event)
                break;
            case 'password': handleNonSpacesInput(event);
                break;
            case 'username': handleNonSpacesInput(event);
                break;
            case 'otp': handleOtpInput(event);
                break;
            default: return null
        }
    }

    return (
        <div className={`popup-field ${isPassword ? 'popup-field--password' : ''}`}>
            <div className="popup-field__wrapper">
                <input
                    className={`popup-field__input ${isError ? 'popup-field__input--error': ''}`}
                    {...props}
                    {...field}
                    type={isPassword ? isPasswordVisible ? 'text' : 'password' : props.type}
                    autoComplete="on"
                    aria-label={props.placeholder || "Input field"}
                    onInput={handleInput}
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
