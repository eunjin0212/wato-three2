// eslint-disable-next-line no-unused-vars
import axios, { Axios, AxiosHeaders } from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'https://katalk.store/api/'
const apiToken = Cookies.get('token');

axios.defaults.headers.common.Authorization = `Bearer ${apiToken}`;

/**
 * @type {Axios} api
 */
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

/**
 * @param {AxiosHeaders} headers 
 * @returns 
 */
export const needHeaderApi = (headers) => axios.create({
  baseURL,
  headers,
})
