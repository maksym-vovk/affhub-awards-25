import React, {useEffect, useRef, useState} from 'react'
import './Header.scss'
import logo from '/assets/main-logo.svg'

import { useTranslation } from 'react-i18next'
import LangSwitcher from "../LangSwitcher/LangSwitcher.jsx";
import Button from "../Button/Button.jsx";
import {useModal} from "../../context/ModalProvider.jsx";
import {useAuth} from "../../context/AuthProvider.jsx";

function Header() {
    const { t, i18n } = useTranslation();
    const {currentUser, handleLogout} = useAuth()
    const [visible, setVisible] = useState(true);
    const {openModal} = useModal()
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
                        {currentUser && <span onClick={() => handleLogout()}>{currentUser.name}</span>}
                        <Button
                            className="header__btn button"
                            onClick={() => openModal('login')}
                        >
                            {t('common.loginButton')}
                        </Button>
                        <LangSwitcher i18n={i18n}/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
