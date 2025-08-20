import './OverviewSection.scss'
import overviewImgPng from "../../assets/overview-woman.png";
import {useTranslation} from "react-i18next";
// import overviewImgWebp from "../../assets/overview-woman.webp";

function OverviewSection() {
    const { t } = useTranslation();

    return (
        <section className="overview block">
            <div className="overview__wrapper container">
                <picture>
                    {/*<source srcSet={overviewImgWebp} type="image/webp" />*/}
                    <img src={overviewImgPng} alt="Woman" className="overview__img"/>
                </picture>
                <div className="overview__content">
                    <p className="overview__text">
                        {t('overview.text')}
                    </p>
                    <p className="overview__text overview__text--remark">
                        {t('overview.remark')}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default OverviewSection
