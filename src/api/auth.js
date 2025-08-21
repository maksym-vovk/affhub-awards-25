import apiClient from "./axios.js";

export const api = {
    register: async (values) => {
        try {
            const res = await apiClient.post('/users/register', values);
            return {success: true, data: res.data};
        } catch (error) {
            if (error.response) {
                return {success: false, error: error.response.data.message || {
                    title: "Registration failed",
                    text: "An error occurred during registration. Please try again later.",
                }};
            }
            return {success: false, error: {
                title: "Network Error or Server Unreachable",
                text: "Unable to connect to the server. Please check your internet connection and try again"
            }};
        }

    }
}