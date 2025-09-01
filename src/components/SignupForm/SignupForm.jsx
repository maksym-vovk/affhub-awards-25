import "./SignupForm.scss"

import {Form, Formik} from "formik";
import * as Yup from 'yup';
import FormField from "../FormField/FormField.jsx";
import Button from "../Button/Button.jsx";
import {useTranslation} from "react-i18next";
import FormSwitcher from "../FormSwitcher/FormSwitcher.jsx";
import FaqButton from "../FaqButton/FaqButton.jsx";
import {authApi} from "../../api/auth.js";
import {useLoader} from "../../context/LoaderProvider.jsx";
import {useModal} from "../../context/ModalProvider.jsx";

function SignupForm() {
    const { t } = useTranslation();
    const {showLoader, hideLoader} = useLoader()
    const {openModal, closeModalWithDelay} = useModal()

    const signupSchema = Yup.object({
        name: Yup.string()
            .required(t('modal.validation.name.required')),
        password: Yup.string()
            .required(t('modal.validation.password.required'))
            // .min(8, t('modal.validation.password.min'))
            .min(6, t('modal.validation.password.min'))
            .max(20, t('modal.validation.password.max')),
            // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, t('modal.validation.password.matches')),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], t('modal.validation.repeatPassword.oneOf'))
            .required(t('modal.validation.repeatPassword.required'))
            // .min(8, t('modal.validation.password.min'))
            .min(6, t('modal.validation.password.min'))
            .max(20, t('modal.validation.password.max')),
            // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, t('modal.validation.password.matches')),
        email: Yup.string()
            .email(t('modal.validation.email.test'))
            .required(t('modal.validation.email.required'))
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, t('modal.validation.email.matches')),
        phoneNumber: Yup.string()
            .required(t('modal.validation.phone.required'))
            .matches(/^\+?[1-9]\d{6,14}$/, t('modal.validation.phone.matches'))
    })

    async function handleSubmit({ repeatPassword, ...submitValues }, { resetForm }) {
        showLoader();

        localStorage.setItem('signupData', JSON.stringify({
            email: submitValues.email,
            name: submitValues.name,
            phoneNumber: submitValues.phoneNumber,
        }));

        const res = await authApi.register(submitValues, t)

        if (res.error) {
            openModal('message', res.error)
        } else {
            openModal('message', res.message)
        }

        closeModalWithDelay();
        resetForm();
        hideLoader(false);
    }

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                phoneNumber: '',
                password: '',
                repeatPassword: '',
            }}
            validationSchema={signupSchema}
            onSubmit={handleSubmit}
        >
            <>
                <h2 className="popup__title">
                    {t('modal.titles.signup')}
                </h2>
                <FormSwitcher/>
                <Form className="popup__form">
                    <FormField
                        name="name"
                        type="text"
                        placeholder={t('modal.placeholders.name')}
                    />
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
                    <FormField
                        name="repeatPassword"
                        type="password"
                        placeholder={t('modal.placeholders.repeatPassword')}
                        maxLength="20"
                    />
                    <FormField
                        name="phoneNumber"
                        type="tel"
                        placeholder={t('modal.placeholders.phone')}
                        maxLength="16"
                    />
                    <Button
                        className="popup__button button"
                        type="submit"
                    >
                        {t('modal.buttons.signup')}
                    </Button>
                    <FaqButton/>
                </Form>
            </>
        </Formik>
    )
}

export default SignupForm
