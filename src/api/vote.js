import apiClient from "./axios.js";

const serverErrorMessages = {
    votes: {
        alreadyCreated: 'Vote already exists for this nomination and niche'
    }
}

export const voteApi = {
    getStatistic: async () => {
        try {
            const res = await apiClient.get('/vote/statistics')
            return res.data || [];
        } catch (error) {
            if (error.response) {
                throw {
                    success: false,
                    errorMessage: {
                        title: "Cannot get statistics",
                        text: "An error occurred during getting statistic. Please try again later",
                    }
                };
            }
            throw {
                success: false,
                errorMessage: {
                    title: "Network Error or Server Unreachable",
                    text: "Unable to connect to the server. Please check your internet connection and try again"
                }
            };
        }

    },
    createVote: async ({ authToken, ...values}) => {
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
                if (isCreated) {
                    throw {
                        success: false,
                        errorMessage: {
                            title: "Current user has already voted",
                            text: "In this category you can vote only once. Please select another category",
                        }
                    };
                }

                throw {
                    success: false,
                    errorMessage: {
                        title: "Vote creation failed",
                        text: "An error occurred during creating vote. Please try again later",
                    }
                };
            }
            throw {
                success: false,
                errorMessage: {
                    title: "Network Error or Server Unreachable",
                    text: "Unable to connect to the server. Please check your internet connection and try again"
                }
            };
        }
    },
    getUsersVotes: async (authToken) => {
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
                        title: "Cannot get users votes",
                        text: "An error occurred during getting statistic. Please try again later.",
                    }
                };
            }
            throw {
                success: false,
                errorMessage: {
                    title: "Network Error or Server Unreachable",
                    text: "Unable to connect to the server. Please check your internet connection and try again"
                }
            };
        }
    },
}
