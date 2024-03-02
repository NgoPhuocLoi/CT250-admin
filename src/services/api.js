import axios from "axios";

const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const createApiClient = (resourceUrl, options) => {
  const axiosConfig = {
    baseURL: BASE_URL + resourceUrl,
    ...commonConfig,
  };

  if (options?.needAuth) {
    axiosConfig.headers.Authorization = `Bearer ${localStorage.getItem(
      "accesstoken"
    )}`;
  }
  return axios.create(axiosConfig);
};

export default createApiClient;
