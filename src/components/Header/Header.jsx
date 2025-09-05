import React, {useEffect, useRef, useState} from 'react'
import './Header.scss'
import logo from '/assets/main-logo.svg'
import logoMin from '/assets/logo-min.svg'

import { useTranslation } from 'react-i18next'
import LangSwitcher from "../LangSwitcher/LangSwitcher.jsx";
import Button from "../Button/Button.jsx";
import {useModal} from "../../context/ModalProvider.jsx";
import {useAuth} from "../../context/AuthProvider.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";

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
                    <picture>
                        <source srcSet={logo} media="(min-width: 375px)" />
                        <img src={logoMin} alt="Affhub logo" width='110' height='25' className="header__logo logo" />
                    </picture>
                    <div className="header__controls">
                        {currentUser && (
                            <UserMenu
                                user={currentUser}
                            />
                        )}

                        {!currentUser && (
                            <Button
                                className="header__btn button button--primary"
                                onClick={() => openModal('login')}
                            >
                                {t('common.loginButton')}
                            </Button>
                        )}
                        <LangSwitcher i18n={i18n}/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
