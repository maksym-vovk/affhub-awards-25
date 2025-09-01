import './CompanyCard.scss'
import { IoCloudDoneSharp } from "react-icons/io5";

import {useTranslation} from "react-i18next";
import Button from "../Button/Button.jsx";
import {useModal} from "../../context/ModalProvider.jsx";
import {useAuth} from "../../context/AuthProvider.jsx";
import {authApi} from "../../api/auth.js";
import {useLoader} from "../../context/LoaderProvider.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {voteApi} from "../../api/vote.js";

function CompanyCard({ nominationTag, categoryTag, company }) {
    const { t } = useTranslation();
    const { openModal, changeModalType, changeModalTypeWithDelay, closeModalWithDelay } = useModal()
    const { authToken } = useAuth()
    const { showLoader, hideLoader } = useLoader()

    const imgSrc = `/assets/${company.logo}`
    const imgElement = <img className="company__logo" src={imgSrc} alt={company.name} /> || null

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (params) => voteApi.createVote(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['statistics'] })
            queryClient.invalidateQueries({ queryKey: ['usersVotes'] })
        },
        onError: handleVoteError,
    })

    async function handleVote() {
        if (!authToken) {
            openModal('login')
            return;
        }

        mutation.mutate({
            nomination: nominationTag,
            niche: categoryTag,
            vote: company.tag,
            authToken,
            t
        })
    }

    async function checkPhoneVerification() {
        showLoader()

        try {
            const res = await authApi.checkPhoneVerification(authToken, t)

            if (!res.success) {
                throw res
            }

            return res.success
        } catch (errorResponse) {
            const isSMSSent = localStorage.getItem('requestKey')
            const isVerifyReqSuccess = !isSMSSent && await sendPhoneVerifyRequest(authToken)

            if (isVerifyReqSuccess || isSMSSent) {
                openModal('message', errorResponse.error)
                changeModalTypeWithDelay('phoneOtp', {
                    onSubmit: verifyPhone,
                })
            }

            return errorResponse.success
        } finally {
            hideLoader()
        }
    }

    async function handleVoteError(error) {
        const { phoneVerified, socialVerified } = error.metadata
        const { errorMessage } = error

        if (!phoneVerified && !socialVerified) {
            await runPhoneAndSocialVerification(errorMessage)
            return
        }

        openModal('socialVerification')
    }

    async function runPhoneAndSocialVerification(notification) {
        try {
            const isSMSSent = localStorage.getItem('requestKey')
            const verifyReqStatus = !isSMSSent && await sendPhoneVerifyRequest(authToken, t)

            if (!isSMSSent && !verifyReqStatus.success) {
                openModal('message', verifyReqStatus.error)
                closeModalWithDelay()
                return;
            }

            openModal('message', notification)
            changeModalTypeWithDelay('phoneOtp', {
                onSubmit: verifyPhone,
                nextStep: {
                    type: 'socialVerification',
                    props: {}
                }
            })
        } catch (error) {
            console.warn('runPhoneAndSocialVerification Error: ', error)
        }
    }

    async function sendPhoneVerifyRequest(authToken, t) {
        try {
            showLoader()
            const res = await authApi.requestPhoneVerification(authToken, t)

            if (!res.success) {
                throw res
            }

            localStorage.setItem('requestKey', res.data.code)
            return res
        } catch (errorResponse) {
            return errorResponse
        } finally {
            hideLoader()
        }
    }

    async function verifyPhone(values) {
        const requestKey = localStorage.getItem('requestKey') || '';

        try {
            showLoader()
            const response = await authApi.verifyPhone({
                requestKey,
                code: values.otp
            }, authToken, t)

            if (!response.success) {
                throw response
            }

            localStorage.removeItem('requestKey')
            openModal('message', response.message)
        } catch (errorResponse) {
            if (errorResponse.expired) {
                localStorage.removeItem('requestKey')
                openModal('message', errorResponse.error)
                closeModalWithDelay()
                return;
            }

            throw errorResponse
        } finally {
            hideLoader()
        }

    }

    return (
        <div className={`company ${authToken && company.voted ? 'voted' : ''}`} data-company={company.tag}>
            <div className="company__body">
                {
                    company.link
                        ? <a className="company__img" href={company.link} target="_blank">{imgElement}</a>
                        : imgElement
                }
                <span className="company__name">{company.name}</span>
                <div className="company__desc-wrapper company__desc-wrapper--shadow_bottom">
                    <p className="company__desc">{company.desc}</p>
                </div>

                <Button
                    className="company__button button button--primary"
                    onClick={handleVote}
                >
                    {t('common.voteButton')}
                </Button>
                <div className="company-status">
                    <IoCloudDoneSharp className="company-status__svg"/>
                    <p className="company-status__text">
                        {t('companies.card.status')}
                    </p>
                </div>
            </div>
            <span className="company__votes">{company.percent.toFixed(2)}</span>
        </div>
    )
}

export default CompanyCard
