import './UserMenu.scss'
import React, {useEffect, useRef, useState} from "react";
import Button from "../Button/Button.jsx";
import {useTranslation} from "react-i18next";
import useClickOutside from "../../hooks/useClickOutside.jsx";
import {useLoader} from "../../context/LoaderProvider.jsx";
import { FaUser } from "react-icons/fa";
import { MdEmail, MdOutlinePhoneIphone } from "react-icons/md";

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
                        <div className="user__info-item" title={user?.name}>
                            <FaUser />
                            <span>{user?.name || 'Unknown User'}</span>
                        </div>
                        <div className="user__info-item" title={user?.email}>
                            <MdEmail />
                            <span>{user?.email || 'No Email'}</span>
                        </div>
                        <div className="user__info-item" title={user?.phoneNumber}>
                            <MdOutlinePhoneIphone />
                            <span>{user?.phoneNumber || 'No Phone'}</span>
                        </div>
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
