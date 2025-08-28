import './UserMenu.scss'
import React, {useEffect, useRef, useState} from "react";
import Button from "../Button/Button.jsx";
import {useTranslation} from "react-i18next";
import useClickOutside from "../../hooks/useClickOutside.jsx";
import {useLoader} from "../../context/LoaderProvider.jsx";

function UserMenu({ user, handleLogout }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const { showLoader, hideLoader } = useLoader();
    const userInitials = user?.name ? user.name.split(' ').map(word => word[0]).join('').slice(0,2) : '??';

    const userMenuBlock = useRef(null);
    useClickOutside(userMenuBlock, open, () => setOpen(false));

    return (
        <div className="user" ref={userMenuBlock}>
            <button
                className="user__logo"
                onClick={() => setOpen(prev => !prev)}
            >
                {userInitials}
            </button>
            {open && (
                <div className="user__menu">
                    <div className="user__info">
                        <span className="user__info-item" title={user?.name}>
                            {`Name: ${user?.name || 'Unknown User'}`}
                        </span>
                        <span className="user__info-item" title={user?.email}>
                            {`Email: ${user?.email || 'No Email'}`}
                        </span>
                        <span className="user__info-item" title={user?.phoneNumber}>
                            {`Phone: ${user?.phoneNumber || 'No Phone'}`}
                        </span>
                    </div>
                    <Button
                        className="user__btn button"
                        onClick={() => {
                            showLoader()
                            handleLogout()
                            hideLoader()
                        }}
                    >
                        {t('common.logoutButton') }
                    </Button>
                </div>
            )}
        </div>
    )
}

export default UserMenu
