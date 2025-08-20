import "./LoginForm.scss"
import * as Yup from "yup";
import {Form, Formik} from "formik";
import FormField from "../FormField/FormField.jsx";
import Button from "../Button/Button.jsx";
import {useTranslation} from "react-i18next";
import FormSwitcher from "../FormSwitcher/FormSwitcher.jsx";
import FaqButton from "../FaqButton/FaqButton.jsx";

function LoginForm() {
    const { t } = useTranslation();
    return (
        <Formik
            initialValues={{
                email: '',
            }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email(t('modal.validation.email.test'))
                    .required(t('modal.validation.email.required'))
                    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, t('modal.validation.email.matches')),
            })}
            onSubmit={(values) => {
                console.log('Form submitted with values:', JSON.stringify(values, null, 2));
            }}
        >
            <>
                <h2 className="popup__title">
                    {t('modal.titles.signup')}
                </h2>
                <FormSwitcher/>
                <Form className="popup__form">
                    <FormField
                        name="email"
                        type="email"
                        placeholder={t('modal.placeholders.email')}
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
