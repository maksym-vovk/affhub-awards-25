import "./OtpForm.scss"
import {useTranslation} from "react-i18next";
import {useModal} from "../../context/ModalProvider.jsx";
import * as Yup from "yup";
import Button from "../Button/Button.jsx";
import FormField from "../FormField/FormField.jsx";
import {Form, Formik} from "formik";

function OtpForm() {
    const {t} = useTranslation();
    const {type, changeModalType} = useModal()

    function handleOtpInput(e) {
        const raw = e.target.value;
        e.target.value = raw.replace(/[^\d]/g, '');
    }

    return (
        <Formik
            initialValues={{
                otp: '',
            }}
            validationSchema={Yup.object({
                otp: Yup.string()
                    .required(t('modal.validation.otp.required'))
                    .matches(/^\d+$/, t('modal.validation.otp.matches'))
                    .min(6, t('modal.validation.otp.min'))
            })}
            onSubmit={(values, {resetForm}) => {
                console.log('Form submitted with values:', JSON.stringify(values, null, 2));
                resetForm();
            }}
        >
            <div className="otp">
                <h3 className="otp__title">
                    {type === 'emailOtp' ? "Введіть код з email:" : "Введіть код з SMS:"}
                </h3>
                <Form>
                    <FormField
                        name="otp"
                        type="text"
                        placeholder={t('modal.placeholders.otp')}
                        onInput={handleOtpInput}
                        maxLength={6}
                    />
                    <Button
                        className="popup__button button"
                        type="submit"
                    >
                        {t('modal.buttons.sendOtp')}
                    </Button>
                </Form>
            </div>
        </Formik>
    )
}

export default OtpForm
