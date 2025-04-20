import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://e-learning-portal-backend.vercel.app/api",
    withCredentials: true,
})