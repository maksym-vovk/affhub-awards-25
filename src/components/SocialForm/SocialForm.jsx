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
import useVerificationStatus from "../../hooks/useVerificationStatus.jsx";

const INSTAGRAM_PAGE_URL = 'https://www.instagram.com/affhub.global?igsh=MW1sb3ZucWFmMWtzMg%3D%3D'

function SocialForm() {
    const {t} = useTranslation();
    const {authToken} = useAuth()
    const {showLoader, hideLoader} = useLoader()
    const {closeModal, closeModalWithDelay, changeModalType} = useModal()
    const [type, setType] = useState('instagram');
    const [telegramLink, setTelegramLink] = useState(null)

    const {requestVerification, removeVerificationRequest} = useVerificationStatus()

    const switcherOptions = [
        {type: 'instagram', text: 'Instagram'},
        {type: 'telegram', text: 'Telegram'},
    ]

    const usernameSchema = Yup.object({
        username: Yup.string()
            .required(t('modal.validation.social.required'))
    })

    async function verifyInstagram(values) {
        try {
            showLoader()
            const res = await authApi.verifyInstagram(values, authToken, t)

            if (!res.success) throw res.error

            changeModalType('message', res.message)
            closeModalWithDelay()

            requestVerification('instagram')
        } catch (error) {
            changeModalType('message', error)
            closeModalWithDelay()
            removeVerificationRequest()
        } finally {
            hideLoader()
        }
    }

    async function verifyTelegram() {
        try {
            showLoader()
            const res = await authApi.verifyTelegram(authToken, t)

            if (!res.success) throw res.error

            setTelegramLink(res.link)

            requestVerification('telegram')
        } catch (error) {
            changeModalType('message', error)
            closeModalWithDelay()
            removeVerificationRequest()
        } finally {
            hideLoader()
        }
    }

    async function handleSubmit(values) {
        await verifyInstagram({
            verificationType: 'INSTAGRAM_SUBSCRIPTION',
            tag: values.username
        })
    }

    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                }}
                validationSchema={usernameSchema}
                onSubmit={handleSubmit}
            >
                <>
                    <h2 className="popup__title">
                        {t('modal.social.title')}
                    </h2>

                    <FormSwitcher
                        type={type}
                        options={switcherOptions}
                        onSwitch={setType}
                    />

                    {type === 'instagram' && (
                        <div className="popup__content">
                            <p className="popup__text">
                                {t('modal.social.info')}&nbsp;
                                <a
                                    href={INSTAGRAM_PAGE_URL}
                                    className="popup__link"
                                    target="_blank"
                                >
                                    {t('modal.social.link')}
                                </a>
                            </p>
                            <Form className="social-form">
                                <FormField
                                    name="username"
                                    type="text"
                                    placeholder={t('modal.placeholders.username')}
                                    maxLength={32}
                                />
                                <Button
                                    className="popup__button button button--primary"
                                    type="submit"
                                >
                                    {t('modal.buttons.confirm')}
                                </Button>
                                <p className="popup__text">
                                    {t('modal.social.fn')}
                                </p>
                            </Form>
                        </div>
                    )}
                </>
            </Formik>

            {type === 'telegram' && (
                <div className="popup__content">
                    {!telegramLink
                        ? (
                            <Button
                                className="popup__button button button--primary"
                                type="submit"
                                onClick={verifyTelegram}
                            >
                                {t('modal.buttons.getLink')}
                            </Button>
                        )
                        : (
                            <Button
                                as='a'
                                href={telegramLink}
                                target="_blank"
                                className="popup__button button button--primary"
                                type="submit"
                                onClick={() => closeModal()}
                            >
                                {t('modal.buttons.toBot')}
                            </Button>
                        )
                    }
                </div>
            )}
        </>

    )
}

export default SocialForm
