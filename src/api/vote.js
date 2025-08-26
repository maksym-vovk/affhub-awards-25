function fetchStatistic() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(JSON.stringify([
                {
                    "nomination": "best-partner",
                    "niche": "gambling",
                    "results": [
                        {
                            "company": "datifylink",
                            "percentage": 100.0
                        }
                    ]
                }
            ]));
        }, 3000)
    })
}

export const voteApi = {
    getStatistic: async (values) => {
        try {
            const res = await fetchStatistic();
            return JSON.parse(res)
        } catch (error) {
            if (error.response) {
                return {
                    success: false,
                    error: error.response.data.message || {
                        title: "Statistic failed",
                        text: "An error occurred during getting statistic. Please try again later.",
                    }
                };
            }
            return {
                success: false, error: {
                    title: "Network Error or Server Unreachable",
                    text: "Unable to connect to the server. Please check your internet connection and try again"
                }
            };
        }

    }
}