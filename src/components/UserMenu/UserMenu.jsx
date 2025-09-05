import './UserMenu.scss'
import React, {useEffect, useRef, useState} from "react";
import Button from "../Button/Button.jsx";
import {useTranslation} from "react-i18next";
import useClickOutside from "../../hooks/useClickOutside.jsx";
import {useLoader} from "../../context/LoaderProvider.jsx";
import {FaGlobe, FaUser} from "react-icons/fa";
import {MdEmail, MdOutlineError, MdOutlinePhoneIphone, MdVerifiedUser} from "react-icons/md";
import {useQuery} from "@tanstack/react-query";
import {authApi} from "../../api/auth.js";
import {useAuth} from "../../context/AuthProvider.jsx";
import {RotatingLines} from "react-loader-spinner";
import useVerificationStatus from "../../hooks/useVerificationStatus.jsx";

function UserMenu({ user }) {
    const { t } = useTranslation();
    const { handleLogout } = useAuth();
    const { showLoader, hideLoader } = useLoader();
    const {
        isPhoneVerified,
        isSocialVerified,
        verifiedSocialMedia
    } = useVerificationStatus()
    const [open, setOpen] = useState(false);
    const userMenuBlock = useRef(null);
    const userInitials = user?.name ? user.name.split(' ').map(word => word[0]).join('').slice(0,2) : '??';

    useClickOutside(userMenuBlock, open, () => setOpen(false));

    const socialVerificationStatusIcon = () => {
        switch (isSocialVerified) {
            case 'pending':
                return (
                    <div className="user__loader">
                        <RotatingLines
                            title="Checking information"
                            visible={true}
                            height="100%"
                            width="100%"
                            strokeColor="#fff"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                        />
                    </div>
                )
            case 'verified':
                return (
                    <MdVerifiedUser
                        title={t('common.verified')}
                        className="user__info-status user__info-status--success"
                    />
                )
            case 'notVerified':
                return (
                    <MdOutlineError
                        title={t('common.notVerified')}
                        className="user__info-status user__info-status--error"
                    />
                )
            case 'failed':
                return (
                    <MdOutlineError
                        title="Verification Failed"
                        className="user__info-status user__info-status--error"
                    />
                )
            default:
                return null;
        }
    }

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
                            <FaUser className="user__info-icon" />
                            <span>{user?.name ?? 'Unknown User'}</span>
                        </div>
                        <div className="user__info-item" title={user?.email}>
                            <MdEmail className="user__info-icon" />
                            <span>{user?.email ?? 'No Email'}</span>
                        </div>
                        <div className="user__info-item" title={user?.phoneNumber}>
                            <MdOutlinePhoneIphone className="user__info-icon" />
                            {user?.phoneNumber ?? 'No Phone'}
                            {isPhoneVerified
                                ? <MdVerifiedUser title={t('common.verified')} className="user__info-status user__info-status--success" />
                                : <MdOutlineError title={t('common.notVerified')} className="user__info-status user__info-status--error" />
                            }
                        </div>
                        <div className="user__info-item" title={verifiedSocialMedia?.name ?? t('common.social')}>
                            <FaGlobe className="user__info-icon" />
                            {verifiedSocialMedia?.type ?? t('common.social')}
                            {socialVerificationStatusIcon()}
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
