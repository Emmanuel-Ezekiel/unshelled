import axios, { AxiosInstance } from "axios";

export const Api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-type": "application/json",
  },
});

// Enable sending cookies and other credentials with requests (important for authentication)
Api.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

const createAxiosResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      return Promise.reject(new Error(error.message));
    }
  );
};

createAxiosResponseInterceptor(Api);