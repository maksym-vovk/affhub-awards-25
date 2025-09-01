import "./SocialForm.scss"
import FormSwitcher from "../FormSwitcher/FormSwitcher.jsx";
import {useState} from "react";
import FormField from "../FormField/FormField.jsx";
import Button from "../Button/Button.jsx";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../context/AuthProvider.jsx";
import {authApi} from "../../api/auth.js";
import {useModal} from "../../context/ModalProvider.jsx";
import {useLoader} from "../../context/LoaderProvider.jsx";

function SocialForm() {
    const {t} = useTranslation();
    const {authToken} = useAuth()
    const {showLoader, hideLoader} = useLoader()
    const {closeModalWithDelay, changeModalType} = useModal()
    const [type, setType] = useState('instagram');

    const switcherOptions = [
        {type: 'instagram', text: 'Instagram'},
        {type: 'telegram', text: 'Telegram'},
    ]

    const usernameSchema = Yup.object({
        username: Yup.string()
            .required('Поле не може бути порожнім')
    })

    async function verifyInstagram(values) {
        try {
            showLoader()
            const res = await authApi.verifyInstagram(values, authToken, t)

            if (!res.success) throw res.error

            changeModalType('message', res.message)
            closeModalWithDelay()
        } catch (error) {
            changeModalType('message', error)
            closeModalWithDelay()
        } finally {
            hideLoader()
        }
    }

    async function verifyTelegram() {
        try {
            showLoader()
            const res = await authApi.verifyTelegram(authToken, t)

            if (!res.success) throw res.error

            window.open(res.link, "_blank")
            closeModalWithDelay(100)
        } catch (error) {
            changeModalType('message', error)
            closeModalWithDelay()
        } finally {
            hideLoader()
        }
    }

    async function handleSubmit(values, {resetForm}) {
        await verifyInstagram({
            verificationType: 'INSTAGRAM_SUBSCRIPTION',
            tag: values.username
        })
    }

    return (
        <Formik
            initialValues={{
                username: '',
            }}
            validationSchema={usernameSchema}
            onSubmit={handleSubmit}
        >
            <>
                <h2 className="popup__title">
                    Веріфікуйтесь з вікористанням однієї з соціальних мереж
                </h2>

                <FormSwitcher
                    type={type}
                    options={switcherOptions}
                    onSwitch={setType}
                />


                {type === 'instagram' && (
                    <Form className="social-form">
                        <FormField
                            name="username"
                            type="text"
                            placeholder="Введіть ім'я користувача"
                            maxLength={32}
                        />
                        <Button
                            className="popup__button button button--primary"
                            type="submit"
                        >
                            Підтвердити
                        </Button>
                    </Form>
                )}

                {type === 'telegram' && (
                    <div className="popup__content">
                        <Button
                            className="popup__button button button--primary"
                            type="submit"
                            onClick={verifyTelegram}
                        >
                            Перейти в бот
                        </Button>
                    </div>
                )}

            </>
        </Formik>
    )
}

export default SocialForm
