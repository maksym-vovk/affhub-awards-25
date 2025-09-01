import "./LoginForm.scss"
import * as Yup from "yup";
import {Form, Formik} from "formik";
import FormField from "../FormField/FormField.jsx";
import Button from "../Button/Button.jsx";
import {useTranslation} from "react-i18next";
import FormSwitcher from "../FormSwitcher/FormSwitcher.jsx";
import FaqButton from "../FaqButton/FaqButton.jsx";
import {useAuth} from "../../context/AuthProvider.jsx";
import {useLoader} from "../../context/LoaderProvider.jsx";
import {useModal} from "../../context/ModalProvider.jsx";

function LoginForm() {
    const { t } = useTranslation();
    const {handleLogin} = useAuth()
    const {showLoader, hideLoader} = useLoader()
    const {openModal, closeModalWithDelay, changeModalTypeWithDelay} = useModal()

    const loginSchema = Yup.object({
        email: Yup.string()
            .email(t('modal.validation.email.test'))
            .required(t('modal.validation.email.required'))
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, t('modal.validation.email.matches')),
        password: Yup.string()
            .required(t('modal.validation.password.required'))
            .min(6, t('modal.validation.password.min'))
            .max(20, t('modal.validation.password.max'))
            // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, t('modal.validation.password.matches')),
    })

    async function handleEmailVerification(values) {
        const requestId = localStorage.getItem('requestId') || '';
        try {
            const res = await handleLogin({
                requestId,
                code: values.otp
            })
            localStorage.removeItem('requestId')
            openModal('message', res.message)
        } catch (error) {
            throw error
        }

    }

    async function handleSubmit(values, { resetForm }) {
        showLoader()

        const { email, password } = values;

        try {
            const res = await handleLogin({
                login: email,
                password,
                rememberMe: true
            })
            openModal('message', res.message)
            resetForm();
            closeModalWithDelay();
        } catch (errorResponse) {
            if (errorResponse.data) {
                openModal('message', errorResponse.error)
                changeModalTypeWithDelay('emailOtp', {
                    onSubmit: handleEmailVerification
                })
            } else {
                openModal('message', errorResponse.error)
                changeModalTypeWithDelay('login')
            }
        } finally {
            hideLoader()
        }
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
        >
            <>
                <h2 className="popup__title">
                    {t('modal.titles.login')}
                </h2>
                <FormSwitcher/>
                <Form className="popup__form">
                    <FormField
                        name="email"
                        type="email"
                        placeholder={t('modal.placeholders.email')}
                    />
                    <FormField
                        name="password"
                        type="password"
                        placeholder={t('modal.placeholders.password')}
                        maxLength="20"
                    />
                    <Button
                        className="popup__button button"
                        type="submit"
                    >
                        {t('modal.buttons.login')}
                    </Button>
                    <FaqButton/>
                </Form>
            </>
        </Formik>
    )
}

export default LoginForm
