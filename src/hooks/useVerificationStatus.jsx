import {useQuery} from "@tanstack/react-query";
import {authApi} from "../api/auth.js";
import {useAuth} from "../context/AuthProvider.jsx";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const PHONE_VERIFICATION_TYPE = 'PHONE';
const SOCIAL_VERIFICATION_TYPES = ['INSTAGRAM_SUBSCRIPTION', 'TELEGRAM_SUBSCRIPTION'];

function useVerificationStatus() {
    const { t } = useTranslation();
    const { authToken, handleLogout } = useAuth();
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [isSocialVerified, setIsSocialVerified] = useState('notVerified');
    const [verifiedSocialMedia, setVerifiedSocialMedia] = useState(null)

    const { data, isLoading } = useQuery({
        queryKey: ['userInfo'],
        queryFn: () => authApi.getUserInfo(authToken, t),
        refetchInterval: onUserInfoRefetch,
        refetchOnWindowFocus: false,
        enabled: !!authToken
    })

    function onUserInfoRefetch(data) {
        const isVerificationRequested = localStorage.getItem('socialVerificationRequest');
        const userInfo = data.state?.data?.data;

        if (!isVerificationRequested) return false;

        // setIsSocialVerified('pending');

        const socialVerifications = userInfo?.verifications.filter(
            verification => SOCIAL_VERIFICATION_TYPES.includes(verification.type) && verification.verified
        );

        // if (socialVerifications) {
        //     const prevVerifyIds = JSON.parse(localStorage.getItem('verifyId'));
        //     const currentVerifyIds = socialVerifications.map(verification => verification.id);
        //
        //     if (!prevVerifyIds) {
        //         localStorage.setItem('verifyId', JSON.stringify(currentVerifyIds))
        //     } else {
        //         const isPrevRequest = currentVerifyIds.some(id => prevVerifyIds.includes(id))
        //
        //         if (!isPrevRequest) {
        //             removeVerificationRequest()
        //             return false;
        //         }
        //     }
        //
        // }

        const isSomeSocialVerified = socialVerifications && socialVerifications.some(Boolean);

        if (isSomeSocialVerified) {
            removeVerificationRequest()
            return false;
        }

        return 5000;
    }

    function requestVerification(socialMediaName) {
        localStorage.setItem('socialVerificationRequest', socialMediaName)
    }

    function removeVerificationRequest() {
        localStorage.removeItem('socialVerificationRequest')
    }

    useEffect(() => {
        if (isLoading || !data?.data) return;

        const { verifications } = data.data;
        setIsPhoneVerified(() => verifications.some(
            verification => verification.type === PHONE_VERIFICATION_TYPE
        ))

        const socialVerifications = verifications.filter(
            verification => SOCIAL_VERIFICATION_TYPES.includes(verification.type
            ))
        const verifiedSocialMedia = socialVerifications.find(verification => verification.verified)
        const failedSocialVerification = socialVerifications.find(verification => !verification.verified)

        if (verifiedSocialMedia) {
            setIsSocialVerified('verified')
            setVerifiedSocialMedia({
                ...verifiedSocialMedia,
                type: verifiedSocialMedia.type === 'INSTAGRAM_SUBSCRIPTION'
                    ? 'Instagram'
                    : 'Telegram',
            })
            return;
        }

        if (failedSocialVerification) {
            setIsSocialVerified('notVerified')
            setVerifiedSocialMedia(null)
        }

        console.log(data)
    }, [data])

    return { isPhoneVerified, isSocialVerified, verifiedSocialMedia, requestVerification }
}

export default useVerificationStatus