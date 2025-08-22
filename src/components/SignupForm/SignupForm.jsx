import "./SignupForm.scss"

import {Form, Formik} from "formik";
import * as Yup from 'yup';
import FormField from "../FormField/FormField.jsx";
import Button from "../Button/Button.jsx";
import {useTranslation} from "react-i18next";
import FormSwitcher from "../FormSwitcher/FormSwitcher.jsx";
import FaqButton from "../FaqButton/FaqButton.jsx";
import {api} from "../../api/auth.js";
import {useState} from "react";
import {useLoader} from "../../context/LoaderProvider.jsx";
import {useModal} from "../../context/ModalProvider.jsx";

function SignupForm() {
    const { t } = useTranslation();
    const [, setLoading] = useLoader()
    const {openModal, closeModalWithDelay} = useModal()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false);

    const signupSchema = Yup.object({
        name: Yup.string()
            .required(t('modal.validation.name.required')),
        password: Yup.string()
            .required(t('modal.validation.password.required'))
            .min(8, t('modal.validation.password.min'))
            .max(20, t('modal.validation.password.max'))
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, t('modal.validation.password.matches')),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], t('modal.validation.repeatPassword.oneOf'))
            .required(t('modal.validation.repeatPassword.required')),
        email: Yup.string()
            .email(t('modal.validation.email.test'))
            .required(t('modal.validation.email.required'))
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, t('modal.validation.email.matches')),
        phoneNumber: Yup.string()
            .required(t('modal.validation.phone.required'))
            .matches(/^\+?[1-9]\d{6,14}$/, t('modal.validation.phone.matches'))
    })

    function handlePhoneInput(e) {
        const raw = e.target.value;
        let cleaned = raw.replace(/[^\d]/g, '');
        // let cleaned = raw.replace(/[^\d+]/g, '');

        if (cleaned === '') {
            e.target.value = '';
            return;
        }

        if (!cleaned.startsWith('+')) {
            cleaned = '+' + cleaned.replace(/^\+?/, '');
        }

        e.target.value = cleaned;
    }

    function handlePasswordInput(e) {
        e.target.value = e.target.value.trim();
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
            onSubmit={async ({ repeatPassword, ...submitValues }, {resetForm}) => {
                setLoading(true);

                const res = await api.register(submitValues)

                if (res.error) {
                    openModal('error', res.error)
                } else {
                    openModal('error', {title: 'Success', text: "Now you can login with your account."})
                }

                closeModalWithDelay();
                resetForm();
                setLoading(false);
            }}
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
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder={t('modal.placeholders.password')}
                        isPasswordVisible={isPasswordVisible}
                        setIsPasswordVisible={setIsPasswordVisible}
                        onInput={handlePasswordInput}
                        maxLength="20"
                    />
                    <FormField
                        name="repeatPassword"
                        type={isRepeatPasswordVisible ? "text" : "password"}
                        placeholder={t('modal.placeholders.repeatPassword')}
                        isPasswordVisible={isRepeatPasswordVisible}
                        setIsPasswordVisible={setIsRepeatPasswordVisible}
                        onInput={handlePasswordInput}
                        maxLength="20"
                    />
                    <FormField
                        name="phoneNumber"
                        type="tel"
                        placeholder={t('modal.placeholders.phone')}
                        onInput={handlePhoneInput}
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
