// eslint-disable-next-line no-unused-vars
import axios, { Axios, AxiosHeaders } from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'https://katalk.store/api/'
const apiToken = Cookies.get('token');

// FIXME: 서버에서 주는 토큰으로 변경 필요
const tempToken = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJXYXRvIiwiaWF0IjoxNzAzNTA3NTQ4LCJleHAiOjE3MDQxMTIzNDgsInN1YiI6IjIiLCJyb2xlIjoiVVNFUiJ9.fCQTepCszUwicPYzoGNGpoMDTzA7JDu2pBluhqMyei8'
axios.defaults.headers.common['Authorization'] = `Bearer ${tempToken}`;

/**
 * @type {Axios} api
 */
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * @param {AxiosHeaders} headers 
 * @returns 
 */
export const needHeaderApi = (headers) => axios.create({
  baseURL,
  headers,
})
