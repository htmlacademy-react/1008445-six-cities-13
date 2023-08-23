import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { browserHistory } from '../browser-history.ts';
import { AppRoute } from '../const.ts';
import { getUserData } from './user-data.ts';

type DetailMessageType = {
  type: string;
  message: string;
}

const BACKEND_URL = 'https://13.design.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const createAPI = (): AxiosInstance => {
  const api = axios.create({ baseURL: BACKEND_URL, timeout: REQUEST_TIMEOUT });
  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const data = getUserData();
      if (data && config.headers) {
        config.headers[ 'x-token' ] = data.token;
      }
      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response?.status === StatusCodes.NOT_FOUND) {
        browserHistory.push(AppRoute.NotFound);
      }

      if (error.response?.status === StatusCodes.BAD_REQUEST) {
        const { message } = error.response.data;
        toast.error(message);
      }

      throw error;
    }
  );


  return api;
};

export {
  createAPI
};
