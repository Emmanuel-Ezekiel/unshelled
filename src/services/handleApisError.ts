import axios, { AxiosError } from "axios";
import { showToast } from "../utils/helpers";
// Custom error handler functio

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      if (axiosError.response.status === 404) {
        showToast("error", "Request Error, Please Refresh");
      } else {
        showToast("error", axiosError.message);
      }
      return axiosError.response;
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Error setting up request:", axiosError.message);
    }
  } else {
    // Handle other types of errors or unknown errors
    console.error("Unknown error:", error);
    return "Unknown error:";
  }
};