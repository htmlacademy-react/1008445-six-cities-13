import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken } from './token.ts';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

type DetailMessageType = {
  type: string;
  message: string;
}

const BACKEND_URL = 'https://13.design.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const StatusCodeMapping: Record<number, boolean> = {
  [ StatusCodes.BAD_REQUEST ]: true,
  [ StatusCodes.UNAUTHORIZED ]: true,
  [ StatusCodes.NOT_FOUND ]: true
};
const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[ response.status ];
const createAPI = (): AxiosInstance => {
  const api = axios.create({ baseURL: BACKEND_URL, timeout: REQUEST_TIMEOUT });
  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers[ 'x-token' ] = token;
      }
      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const { message } = (error.response.data);
        toast.warning(message);
      }

      throw error;
    }
  );


  return api;
};

export {
  createAPI
};
