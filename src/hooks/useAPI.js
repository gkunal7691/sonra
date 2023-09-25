import { useState } from "react";
import axios from "axios";

export const useApi = () => {
  const [errors, setErrors] = useState(null);
  const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  api.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      setErrors(error);
      return Promise.reject(error);
    }
  );
  return { api, errors };
};
