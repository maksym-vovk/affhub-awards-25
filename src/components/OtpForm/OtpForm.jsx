import "./OtpForm.scss"
import {useTranslation} from "react-i18next";
import {useModal} from "../../context/ModalProvider.jsx";
import * as Yup from "yup";
import Button from "../Button/Button.jsx";
import FormField from "../FormField/FormField.jsx";
import {Form, Formik} from "formik";
import {useLoader} from "../../context/LoaderProvider.jsx";

function OtpForm({ onSubmit, nextStep }) {
    const {t} = useTranslation();
    const {type, openModal, changeModalTypeWithDelay, closeModalWithDelay} = useModal()
    const {showLoader, hideLoader} = useLoader()
    const otpSchema = Yup.object({
        otp: Yup.string()
            .required(t('modal.validation.otp.required'))
            .matches(/^\d+$/, t('modal.validation.otp.matches'))
            .min(6, t('modal.validation.otp.min'))
    })

    async function handleSubmit(values, { resetForm }) {
        try {
            showLoader()
            await onSubmit(values)
            resetForm();
            nextStep ? changeModalTypeWithDelay(nextStep.type, nextStep.props) : closeModalWithDelay();
        } catch (errorResponse) {
            openModal('message', errorResponse.error)
            changeModalTypeWithDelay(type, { onSubmit, nextStep })
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
                    {type === 'emailOtp' ? t('modal.otp.emailTitle') : t('modal.otp.phoneTitle')}
                </h3>
                <Form>
                    <FormField
                        name="otp"
                        type="text"
                        placeholder={t('modal.placeholders.otp')}
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
