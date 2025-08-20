import React, {useEffect, useRef, useState} from 'react'
import './Header.scss'
import logo from '/assets/main-logo.svg'

import { useTranslation } from 'react-i18next'
import LangSwitcher from "../LangSwitcher/LangSwitcher.jsx";
import Button from "../Button/Button.jsx";

function Header() {
    const { t, i18n } = useTranslation();
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(window.scrollY);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
                setVisible(false);
            } else {
                setVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header${visible ? '' : ' header--hidden'}`}>
            <div className="container">
                <div className="header__wrapper">
                    <img src={logo} alt="Affhub logo" width='110' height='25' className="header__logo logo" />
                    <div className="header__controls">
                        <LangSwitcher i18n={i18n}/>
                        <Button className="header__btn button">
                            {t('common.loginButton')}
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
