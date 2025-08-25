import "./LoginForm.scss"
import * as Yup from "yup";
import {Form, Formik} from "formik";
import FormField from "../FormField/FormField.jsx";
import Button from "../Button/Button.jsx";
import {useTranslation} from "react-i18next";
import FormSwitcher from "../FormSwitcher/FormSwitcher.jsx";
import FaqButton from "../FaqButton/FaqButton.jsx";
import {useState} from "react";

function LoginForm() {
    const { t } = useTranslation();


    const loginSchema = Yup.object({
        email: Yup.string()
            .email(t('modal.validation.email.test'))
            .required(t('modal.validation.email.required'))
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, t('modal.validation.email.matches')),
        password: Yup.string()
            .required(t('modal.validation.password.required'))
            .min(8, t('modal.validation.password.min'))
            .max(20, t('modal.validation.password.max'))
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, t('modal.validation.password.matches')),
    })



    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={loginSchema}
            onSubmit={(values, {resetForm}) => {
                console.log('Form submitted with values:', JSON.stringify(values, null, 2));
                resetForm();
            }}
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
