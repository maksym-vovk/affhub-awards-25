import apiClient from "./axios.js";

const serverErrorMessages = {
    register: {
        email: "User with this email already exists",
        phoneNumber: "User with this phone number already exists"
    },
    login: {
        email: "No user with this email or phone number",
        password: "Incorrect password"
    },
    verification: {
        email: "Please verify your email using the verification code sent to you",
        requestId: "Verification code is invalid or has expired",
        code: "The verification code provided is incorrect",
        phone: "No phone verification record for this user",
        phoneCode: "The code you provided is incorrect",
        phoneRequestKey: "No verification request found for this key",
    }
}

export const authApi = {
    register: async (values, t) => {
        try {
            const res = await apiClient.post('/users/register', values);
            return {
                success: true,
                data: res.data,
                message: {
                    title: t("api.auth.success.register.title"),
                    text: t("api.auth.success.register.text")
                }
            };
        } catch (error) {
            if (error.response) {
                const {errors} = error.response.data;
                const isBadEmail = errors.includes(serverErrorMessages.register.email);
                const isBadPhone = errors.includes(serverErrorMessages.register.phoneNumber);

                switch (true) {
                    case isBadEmail && isBadPhone:
                        return {
                            success: false,
                            error: {
                                title: t("api.auth.errors.register.isBadEmailOrPhone.title"),
                                text: t("api.auth.errors.register.isBadEmailOrPhone.text")
                            }
                        }
                    case isBadEmail:
                        return {
                            success: false,
                            error: {
                                title: t("api.auth.errors.register.isBadEmail.title"),
                                text: t("api.auth.errors.register.isBadEmail.text")
                            }
                        };
                    case isBadPhone:
                        return {
                            success: false,
                            error: {
                                title: t("api.auth.errors.register.isBadPhone.title"),
                                text: t("api.auth.errors.register.isBadPhone.text")
                            }
                        };
                    default:
                        return {
                            success: false,
                            error: {
                                title: t("api.auth.errors.register.default.title"),
                                text: t("api.auth.errors.register.default.text")
                            }
                        };
                }
            }

            return {
                success: false, error: {
                    title: t("api.common.errors.default.title"),
                    text: t("api.common.errors.default.text")
                }
            };
        }
    },
    login: async (values, t) => {
        try {
            const res = await apiClient.post('/users/login', values);
            const {data} = res.data;
            return {
                success: true,
                data: data,
                message: {
                    title: t("api.auth.success.login.title"),
                    text: t("api.auth.success.login.text")
                }
            };
        } catch (error) {
            if (error.response) {
                const {message, data, errors} = error.response.data;
                const isNotVerifiedEmail = message.includes(serverErrorMessages.verification.email)
                const isBadEmail = errors.includes(serverErrorMessages.login.email)
                const isBadPassword = errors.includes(serverErrorMessages.login.password)

                switch (true) {
                    case isNotVerifiedEmail:
                        return {
                            success: false,
                            data,
                            error: {
                                title: t("api.auth.errors.login.isNotVerifiedEmail.title"),
                                text: t("api.auth.errors.login.isNotVerifiedEmail.text")
                            },
                        }
                    case isBadEmail:
                        return {
                            success: false,
                            error: {
                                title: t("api.auth.errors.login.isBadEmail.title"),
                                text: t("api.auth.errors.login.isBadEmail.text")
                            }
                        };
                    case isBadPassword:
                        return {
                            success: false,
                            error: {
                                title: t("api.auth.errors.login.isBadPassword.title"),
                                text: t("api.auth.errors.login.isBadPassword.text")
                            }
                        };
                    default:
                        return {
                            success: false,
                            error: {
                                title: t("api.auth.errors.login.default.title"),
                                text: t("api.auth.errors.login.default.text"),
                            }
                        };
                }
            }

            return {
                success: false, error: {
                    title: t("api.common.errors.default.title"),
                    text: t("api.common.errors.default.text")
                }
            };
        }
    },
    verifyEmail: async (values, t) => {
        try {
            const res = await apiClient.post('/users/verify-email', values);
            const {data} = res.data;
            return {
                success: true,
                data: data,
                message: {
                    title: t("api.auth.success.verifyEmail.title"),
                    text: t("api.auth.success.verifyEmail.text")
                }
            };
        } catch (error) {
            if (error.response) {
                const {errors} = error.response.data;
                const isBadRequestId = errors.includes(serverErrorMessages.verification.requestId);
                const isBadCode = errors.includes(serverErrorMessages.verification.code);

                switch (true) {
                    case isBadRequestId:
                        return {
                            success: false,
                            error: {
                                title: t("api.auth.errors.verifyEmail.isBadRequestId.title"),
                                text: t("api.auth.errors.verifyEmail.isBadRequestId.text")
                            }
                        }
                    case isBadCode:
                        return {
                            success: false,
                            error: {
                                title: t("api.auth.errors.verifyEmail.isBadCode.title"),
                                text: t("api.auth.errors.verifyEmail.isBadCode.text")
                            }
                        };
                    default:
                        return {
                            success: false,
                            error: {
                                title: t("api.auth.errors.verifyEmail.default.title"),
                                text: t("api.auth.errors.verifyEmail.default.text")
                            }
                        };
                }
            }

            return {
                success: false, error: {
                    title: t("api.common.errors.default.title"),
                    text: t("api.common.errors.default.text")
                }
            };
        }
    },
    checkPhoneVerification: async (authToken, t) => {
        try {
            const res = await apiClient.get('/users/check-phone', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            return res.data;
        } catch (error) {
            if (error.response) {
                const {errors} = error.response.data;
                const isBadPhoneVerification = errors.includes(serverErrorMessages.verification.phone);

                if (isBadPhoneVerification) {
                    throw {
                        success: false,
                        error: {
                            title: t("api.auth.errors.checkPhone.isBadPhoneVerification.title"),
                            text: t("api.auth.errors.checkPhone.isBadPhoneVerification.text")
                        }
                    }
                }

                throw {
                    success: false,
                    error: {
                        title: t("api.auth.errors.checkPhone.default.title"),
                        text: t("api.auth.errors.checkPhone.default.text")
                    }
                }
            }

            throw {
                success: false, error: {
                    title: t("api.common.errors.default.title"),
                    text: t("api.common.errors.default.text")
                }
            };
        }

    },
    getUserInfo: async (authToken, t) => {
        try {
            const res = await apiClient.get('/users/info', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            return res?.data ?? null;
        } catch (error) {
            console.log(error);
        }

    },
    requestPhoneVerification: async (authToken, t) => {
        try {
            const res = await apiClient.post('/users/request-phone-verify', {}, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            return res.data;
        } catch (error) {
            if (error.response) {
                return {
                    success: false,
                    error: {
                        title: t("api.auth.errors.reqPhoneVerify.default.title"),
                        text: t("api.auth.errors.reqPhoneVerify.default.text")
                    }
                }
            }

            return {
                success: false, error: {
                    title: t("api.common.errors.default.title"),
                    text: t("api.common.errors.default.text")
                }
            };
        }
    },
    verifyPhone: async (values, authToken, t) => {
        try {
            const res = await apiClient.post('/users/confirm-phone-verify', values, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            const {data} = res.data;
            return {
                success: true,
                data: data,
                message: {
                    title: t("api.auth.success.verifyPhone.title"),
                    text: t("api.auth.success.verifyPhone.text")
                }
            };
        } catch (error) {
            if (error.response) {
                const {errors} = error.response.data;
                const isBadRequestId = errors.includes(serverErrorMessages.verification.phoneRequestKey);
                const isBadCode = errors.includes(serverErrorMessages.verification.phoneCode);

                switch (true) {
                    case isBadRequestId:
                        return {
                            success: false,
                            expired: true,
                            error: {
                                title: t("api.auth.errors.verifyPhone.isBadRequestId.title"),
                                text: t("api.auth.errors.verifyPhone.isBadRequestId.text")
                            }
                        }
                    case isBadCode:
                        return {
                            success: false,
                            error: {
                                title: t("api.auth.errors.verifyPhone.isBadCode.title"),
                                text: t("api.auth.errors.verifyPhone.isBadCode.text")
                            }
                        };
                    default:
                        return {
                            success: false,
                            error: {
                                title: t("api.auth.errors.verifyPhone.default.title"),
                                text: t("api.auth.errors.verifyPhone.default.text")
                            }
                        };
                }
            }

            return {
                success: false, error: {
                    title: t("api.common.errors.default.title"),
                    text: t("api.common.errors.default.text")
                }
            };
        }
    },
    verifyInstagram: async (values, authToken, t) => {
        try {
            const res = await apiClient.post('/users/verification', values, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            return {
                success: res.data.success,
                message: {
                    title: 'Verification Request Submitted',
                    text: "We will review your request and let you know by email if it has been approved"
                }
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                return {
                    success: false,
                    error: {
                        title: "Something went wrong",
                        text: "Please try again later"
                    }
                };
            }

            return {
                success: false,
                error: {
                    title: t("api.common.errors.default.title"),
                    text: t("api.common.errors.default.text")
                }
            };
        }
    },
    verifyTelegram: async (authToken, t) => {
        const telegramBotLink = 'https://t.me/affhubvoice2025_bot?start='

        try {
            const res = await apiClient.get('/users/verification/telegram-link', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            const { data } = res.data;

            return {
                success: true,
                link: telegramBotLink + data.code
            }
        } catch (error) {
            if (error.response) {
                return {
                    success: false,
                    error: {
                        title: "Something went wrong",
                        text: "Please try again later"
                    }
                };
            }

            return {
                success: false,
                error: {
                    title: t("api.common.errors.default.title"),
                    text: t("api.common.errors.default.text")
                }
            };
        }
    },
}