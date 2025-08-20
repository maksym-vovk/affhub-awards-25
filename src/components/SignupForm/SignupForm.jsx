import "./SignupForm.scss"

import { Form, Formik } from "formik";
import * as Yup from 'yup';
import FormField from "../FormField/FormField.jsx";
import Button from "../Button/Button.jsx";
import {useTranslation} from "react-i18next";
import FormSwitcher from "../FormSwitcher/FormSwitcher.jsx";
import FaqButton from "../FaqButton/FaqButton.jsx";

function SignupForm() {
    const { t } = useTranslation();

    function handlePhoneInput(e) {
        const raw = e.target.value;
        let cleaned = raw.replace(/[^\d]/g, '');
        // let cleaned = raw.replace(/[^\d+]/g, '');

        if (cleaned === '') {
            e.target.value = '';
            return;
        }

        if (!cleaned.startsWith('+380')) {
            cleaned = '+380' + cleaned.replace(/^\+?3?8?0?/, '');
        }

        e.target.value = cleaned;
    }

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                phone: '',
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .required(t('modal.validation.name.required')),
                email: Yup.string()
                    .email(t('modal.validation.email.test'))
                    .required(t('modal.validation.email.required'))
                    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, t('modal.validation.email.matches')),
                phone: Yup.string()
                    .required(t('modal.validation.phone.required'))
                    .matches(/^\+380\d{9}$/, t('modal.validation.phone.matches'))
            })}
            onSubmit={(values, {resetForm}) => {
                console.log('Form submitted with values:', JSON.stringify(values, null, 2));
                resetForm();
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
                        name="phone"
                        type="tel"
                        placeholder={t('modal.placeholders.phone')}
                        onInput={handlePhoneInput}
                        maxLength="13"
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
