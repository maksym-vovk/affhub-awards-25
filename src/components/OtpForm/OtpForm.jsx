import "./OtpForm.scss"
import {useTranslation} from "react-i18next";
import {useModal} from "../../context/ModalProvider.jsx";
import * as Yup from "yup";
import Button from "../Button/Button.jsx";
import FormField from "../FormField/FormField.jsx";
import {Form, Formik} from "formik";
import {useAuth} from "../../context/AuthProvider.jsx";
import {useLoader} from "../../context/LoaderProvider.jsx";

function OtpForm() {
    const {t} = useTranslation();
    const {type, openModal, changeModalTypeWithDelay, closeModalWithDelay} = useModal()
    const {handleLogin} = useAuth()
    const {showLoader, hideLoader} = useLoader()
    const requestId = localStorage.getItem('requestId') || '';

    const otpSchema = Yup.object({
        otp: Yup.string()
            .required(t('modal.validation.otp.required'))
            .matches(/^\d+$/, t('modal.validation.otp.matches'))
            .min(6, t('modal.validation.otp.min'))
    })

    function handleOtpInput(e) {
        const raw = e.target.value;
        e.target.value = raw.replace(/[^\d]/g, '');
    }

    async function handleSubmit(values, { resetForm }) {
        showLoader()
        try {
            await handleLogin({
                requestId,
                code: values.otp
            })

            localStorage.removeItem('requestId')

            openModal('message', {
                title: type === 'emailOtp'
                    ? 'Your email is verified'
                    : 'Your phone is verified',
                text: type === 'emailOtp'
                    ? 'You have successfully logged in to your account.'
                    : 'Your phone number has been successfully verified.'
            })

            resetForm();
            closeModalWithDelay();
        } catch (errorResponse) {
            openModal('message', errorResponse.error)
            changeModalTypeWithDelay(type)
        } finally {
            hideLoader()
        }
    }

    return (
        <Formik
            initialValues={{
                otp: '',
            }}
            validationSchema={otpSchema}
            onSubmit={handleSubmit}
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
