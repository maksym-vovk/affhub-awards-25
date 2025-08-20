import './FormField.scss'
import { useField } from "formik";

function FormField({ ...props }) {
    const [field, meta] = useField({...props})
    const isError = meta.touched && meta.error
    const isPhoneType = field.name === "phone";



    return (
        <label className="popup__label">
            <input
                className="popup__input"
                {...props}
                {...field}
                autoComplete="on"
            />
            <p className={`popup__error ${isError ? 'active': ''}`}>{isError ? meta.error : 'Empty'}</p>
        </label>
    )
}

export default FormField
