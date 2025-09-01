import apiClient from "./axios.js";

const serverErrorMessages = {
    votes: {
        alreadyCreated: 'Vote already exists for this nomination and niche',
        noSocial: 'No social verification record for this user'
    }
}

export const voteApi = {
    getStatistic: async (t) => {
        try {
            const res = await apiClient.get('/vote/statistics')
            return res.data || [];
        } catch (error) {
            if (error.response) {
                throw {
                    success: false,
                    errorMessage: {
                        title: t("api.vote.errors.statistic.default.title"),
                        text: t("api.vote.errors.statistic.default.text"),
                    }
                };
            }
            throw {
                success: false,
                errorMessage: {
                    title: t("api.common.errors.default.title"),
                    text: t("api.common.errors.default.text")
                }
            };
        }

    },
    createVote: async ({ authToken, t, ...values}) => {
        try {
            await apiClient.post('/vote', values, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
        } catch (error) {
            if (error.response) {
                const {errors} = error.response.data;
                const isCreated = errors.includes(serverErrorMessages.votes.alreadyCreated);
                const isNoSocial = errors.includes(serverErrorMessages.votes.noSocial);
                console.log(isNoSocial);
                switch (true) {
                    case isCreated:
                        throw {
                            success: false,
                            errorMessage: {
                                title: t("api.vote.errors.createVote.isCreated.title"),
                                text: t("api.vote.errors.createVote.isCreated.text"),
                            }
                        };
                    case isNoSocial:
                        throw {
                            success: false,
                            errorMessage: {
                                title: t("api.vote.errors.createVote.isNoSocial.title"),
                                text: t("api.vote.errors.createVote.isNoSocial.text"),
                            }
                        };
                    default:
                        throw {
                            success: false,
                            errorMessage: {
                                title: t("api.vote.errors.createVote.default.title"),
                                text: t("api.vote.errors.createVote.default.text"),
                            }
                        };
                }
            }
            throw {
                success: false,
                errorMessage: {
                    title: t("api.common.errors.default.title"),
                    text: t("api.common.errors.default.text")
                }
            };
        }
    },
    getUsersVotes: async (authToken, t) => {
        try {
            const res = await apiClient.get('/vote/my-votes', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })

            return res.data || [];
        } catch (error) {
            if (error.response) {
                throw {
                    success: false,
                    errorMessage: {
                        title: t("api.vote.errors.usersVotes.default.title"),
                        text: t("api.vote.errors.usersVotes.default.text"),
                    }
                };
            }
            throw {
                success: false,
                errorMessage: {
                    title: t("api.common.errors.default.title"),
                    text: t("api.common.errors.default.text")
                }
            };
        }
    },
}
