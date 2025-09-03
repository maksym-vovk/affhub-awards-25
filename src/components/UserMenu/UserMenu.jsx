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
import {RotatingLines, TailSpin} from "react-loader-spinner";

function UserMenu({ user, handleLogout }) {
    const { t } = useTranslation();
    const { authToken } = useAuth();
    const [open, setOpen] = useState(false);
    const [socialVerification, setSocialVerification] = useState(null);
    const [isSocialVerified, setIsSocialVerified] = useState('notVerified');

    const { showLoader, hideLoader } = useLoader();
    const userInitials = user?.name ? user.name.split(' ').map(word => word[0]).join('').slice(0,2) : '??';

    const userMenuBlock = useRef(null);
    useClickOutside(userMenuBlock, open, () => setOpen(false));


    function onUserInfoRefetch(data) {
        const isVerificationRequested = localStorage.getItem('verificationRequest');
        const userInfo = data.state?.data;

        if (!isVerificationRequested) {
            return false;
        }

        setIsSocialVerified('pending');

        if (userInfo?.data) {
            const socialVerification = userInfo.data.verifications.find(
                verification => ['INSTAGRAM_SUBSCRIPTION', 'TELEGRAM_SUBSCRIPTION'].includes(verification.type)
            );

            if (socialVerification) {
                localStorage.removeItem('verificationRequest');
                setIsSocialVerified('done');
                return false;
            }
        }

        return 5000;
    }

    const { data, isLoading } = useQuery({
        queryKey: ['userInfo'],
        queryFn: () => authApi.getUserInfo(authToken, t),
        refetchInterval: onUserInfoRefetch,
        refetchOnWindowFocus: false,
        enabled: !!authToken
    })

    useEffect(() => {
        if (isLoading || !data) return;
        const socialVerification = data.data.verifications.find(verification => ['INSTAGRAM_SUBSCRIPTION', 'TELEGRAM_SUBSCRIPTION'].includes(verification.type));
        if (!socialVerification?.type) return;
        socialVerification.type = socialVerification.type === 'INSTAGRAM_SUBSCRIPTION' ? 'Instagram' : 'Telegram';
        setSocialVerification(socialVerification);
        setIsSocialVerified('verified');
    }, [data, isLoading])

    const isPhoneVerified = data?.data?.verifications?.some(verification => verification.type === 'PHONE') ?? false;

    const socialVerificationStatusIcon = () => {
        switch (isSocialVerified) {
            case 'pending':
                return (
                    <div className="user__loader">
                        <RotatingLines
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
                        <div className="user__info-item" title={socialVerification?.name ?? t('common.social')}>
                            <FaGlobe className="user__info-icon" />
                            {socialVerification?.type ?? t('common.social')}
                            {/*{socialVerification?.verified*/}
                            {/*    ? <MdVerifiedUser title={t('common.verified')} className="user__info-status user__info-status--success" />*/}
                            {/*    : <MdOutlineError title={t('common.notVerified')} className="user__info-status user__info-status--error" />*/}
                            {/*}*/}
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
