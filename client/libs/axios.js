import axios from "axios";
import Cookies from "js-cookie";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
