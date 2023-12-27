// eslint-disable-next-line no-unused-vars
import axios, { Axios } from 'axios';

/**
 * @type {Axios} api
 */
const api = axios.create({
  baseURL: 'https://katalk.store/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api;