import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export function loginWithAccount(requestParams: any) {
  return axios.post(`${API_URL}/auth/login`, requestParams).then((res) => {
    return res.data.data;
  });
} 