import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://server-back-fabrica-edgyfeggavg7d2at.brazilsouth-01.azurewebsites.net/',
});