import './FaqModal.scss'
import {useFaq} from "../../context/FaqProvider.jsx";
import Button from "../Button/Button.jsx";
import {useTranslation} from "react-i18next";

function FaqModal() {
    const {isOpen, closeModal} = useFaq()
    const { t } = useTranslation();
    const { email, phoneNumber } = localStorage.getItem('signupData')
        ? JSON.parse(localStorage.getItem('signupData'))
        : {email: null, phoneNumber: null};

    const faqEmailOptions = t('faq.letter', { returnObjects: true });
    const mailtoButtons = Object.entries(faqEmailOptions.body.topics)
        .map(([, topic]) => {
            return {
                topic: topic,
                link: `mailto:${faqEmailOptions.emails.join(',')}?subject=${encodeURIComponent(faqEmailOptions.subject)}&body=${encodeURIComponent(`${faqEmailOptions.body.markers.problem}: ${topic}\n\n${faqEmailOptions.body.userData.hero}\n\n- ${faqEmailOptions.body.markers.email}: ${email || faqEmailOptions.body.userData.email}\n- ${faqEmailOptions.body.markers.phone}: ${phoneNumber || faqEmailOptions.body.userData.phone}`)}`
            };
        })

    return (
        <div className={`faq ${isOpen ? 'active' : ''}`}>
            <div className="faq__wrapper">
                <div className="faq__header">
                    <Button className="faq__close" onClick={closeModal}/>
                </div>
                <div className="faq__body">
                    <h2 className="faq__title">
                        {t('faq.title')}
                    </h2>
                    <div className="faq__blocks">
                        <div className="faq__topic">
                            <h3 className="faq__subtitle">
                                {t('faq.subtitle')}
                            </h3>
                            <ul className="faq-list">
                                {mailtoButtons.map(button => (
                                    <li className="faq-list__item" key={button.topic}>
                                        <a href={button.link} className="faq-list__button button">
                                            {button.topic}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FaqModal
