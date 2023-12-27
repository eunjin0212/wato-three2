// eslint-disable-next-line no-unused-vars
import axios, { Axios, AxiosHeaders } from 'axios';

/**
 * @type {Axios} api
 */
export const api = axios.create({
  baseURL: 'https://katalk.store/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * 
 * @param {Record<AxiosHeaders>} headers 
 * @returns 
 */
export const needHeaderApi = (headers) => axios.create({
  baseURL: 'https://katalk.store/api/',
  headers
})
