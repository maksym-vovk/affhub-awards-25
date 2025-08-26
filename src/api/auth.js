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
        code: "The verification code provided is incorrect"
    }
}

export const authApi = {
    register: async (values) => {
        try {
            const res = await apiClient.post('/users/register', values);
            return {
                success: true,
                data: res.data
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
                                title: "Registration failed",
                                text: "User with this email and phone number already exists"
                            }
                        }
                    case isBadEmail:
                        return {
                            success: false,
                            error: {
                                title: "Registration failed",
                                text: "User with this email already exists"
                            }
                        };
                    case isBadPhone:
                        return {
                            success: false,
                            error: {
                                title: "Registration failed",
                                text: "User with this phone number already exists"
                            }
                        };
                    default:
                        return {
                            success: false,
                            error: {
                                title: "Registration failed",
                                text: "Something went wrong. Please try again later"
                            }
                        };
                }
            }

            return {
                success: false, error: {
                    title: "Network Error or Server Unreachable",
                    text: "Unable to connect to the server. Please check your internet connection and try again"
                }
            };
        }
    },
    login: async (values) => {
        try {
            const res = await apiClient.post('/users/login', values);
            const { data } = res.data;
            return {
                success: true,
                data: data
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
                                title: "Yor email is not verified",
                                text: "Please verify your email using the verification code sent to your email address"
                            },
                        }
                    case isBadEmail:
                        return {
                            success: false,
                            error: {
                                title: "Login failed",
                                text: "User with this email or phone number does not exist"
                            }
                        };
                    case isBadPassword:
                        return {
                            success: false,
                            error: {
                                title: "Login failed",
                                text: "User password is incorrect"
                            }
                        };
                    default:
                        return {
                            success: false,
                            error: {
                                title: "Login failed",
                                text: "An error occurred during login. Please try again later.",
                            }
                        };
                }
            }

            return {
                success: false, error: {
                    title: "Network Error or Server Unreachable",
                    text: "Unable to connect to the server. Please check your internet connection and try again"
                }
            };
        }
    },
    verifyEmail: async (values) => {
        try {
            const res = await apiClient.post('/users/verify-email', values);
            const { data } = res.data;
            return {
                success: true,
                data: data
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
                                title: "Verification failed",
                                text: "Verification code is invalid or has expired"
                            }
                        }
                    case isBadCode:
                        return {
                            success: false,
                            error: {
                                title: "Verification failed",
                                text: "The verification code provided is incorrect"
                            }
                        };
                    default:
                        return {
                            success: false,
                            error: {
                                title: "Verification failed",
                                text: "Something went wrong. Please try again later"
                            }
                        };
                }
            }

            return {
                success: false, error: {
                    title: "Network Error or Server Unreachable",
                    text: "Unable to connect to the server. Please check your internet connection and try again"
                }
            };
        }
    },
    checkPhoneVerification: async (authToken) => {
        try {
            const res = await apiClient.get('/users/request-phone-verify', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log("success: ", res);
        } catch (error) {
            console.log("error: ", error);
        }

    },
    verifyPhone: async (values) => {

    }
}