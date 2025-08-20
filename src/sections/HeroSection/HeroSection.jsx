import './HeroSection.scss'
import Button from "../../components/Button/Button.jsx";
import {useTranslation} from "react-i18next";
import heroImgPng from '../../assets/hero.png';
// import heroImgWebp from '../../assets/hero.webp';

function HeroSection() {
    const [ t ] = useTranslation();

    return (
        <section className="hero">
            <div className="hero__wrapper container">
                <div className="hero__content">
                    <h1 className="hero__title">
                        { t('hero.title.company') }
                        <br/>
                        <span>{ t('hero.title.event') }</span>
                        <br/>
                        { t('hero.title.year') }
                    </h1>
                    <Button
                        className="hero__btn button"
                        scrollId="nominations"
                    >
                        {t('common.voteButton')}
                    </Button>
                </div>
                <div className="hero__bg">
                    <picture>
                        {/*<source srcSet={heroImgWebp} type="image/webp" />*/}
                        <img src={heroImgPng} alt="Winds" className="hero__img"/>
                    </picture>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
