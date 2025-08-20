import "./AnnouncementSection.scss"
import {useTranslation} from "react-i18next";
import SocialCard from "../../components/SocialCard/SocialCard.jsx";

import announcementImgPng from "/assets/announcement-woman.png";
// import announcementImgWebp from "/assets/announcement-woman.webp";
import mediaIcon from "/assets/social-media.svg";
import telegramIcon from "/assets/social-telegram.svg";
import instagramIcon from "/assets/social-instagram.svg";
import youtubeIcon from "/assets/social-youtube.svg";

function AnnouncementSection() {
    const { t } = useTranslation();

    return (
        <section className="announcement block">
            <div className="announcement__wrapper container">
                <picture>
                    {/*<source srcSet={announcementImgWebp} type="image/webp" />*/}
                    <img src={announcementImgPng} alt="Woman" className="announcement__img"/>
                </picture>
                <div className="announcement__content">
                    <p className="announcement__text">
                        {t('announcement.text')}
                    </p>
                    <div className="announcement__socials">
                        <SocialCard
                            logo={mediaIcon}
                            name="affhub media"
                            link="https://google.com"
                        />
                        <SocialCard
                            logo={telegramIcon}
                            name="telegram"
                            link="https://google.com"
                        />
                        <SocialCard
                            logo={instagramIcon}
                            name="instagram"
                            link="https://google.com"
                        />
                        <SocialCard
                            logo={youtubeIcon}
                            name="youtube"
                            link="https://google.com"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AnnouncementSection
