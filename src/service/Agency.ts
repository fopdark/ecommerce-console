import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export function loginWithAccount(requestParams: any) {
  return axios.post(`${API_URL}/auth/login`, requestParams).then((res) => {
    return res.data.data;
  });
}

// 1.8 Logout
export function Logout(data: any) {
  return axios.post(`${API_URL}/auth/logout`, data);
}

// 22.1 Get auditions list
export function AuditionsList(data: any) {
  return axios.get(`${API_URL}/auditions`, { params: data }).then((res) => {
    return res.data.data;
  });
}

// 22.1 Get auditions detail
export function AuditionsDetail(id: string) {
  return axios.get(`${API_URL}/auditions/${id}`).then((res) => {
    return res.data.data;
  });
}

// 22.4 Get field list
export function getFields() {
  return axios.get(`${API_URL}/auditions/fields`).then((res) => {
    return res.data.data;
  });
}


// 22.5 Get entertainments list
export function getEntertainments() {
  return axios.get(`${API_URL}/auditions/entertainments`).then((res) => {
    return res.data.data;
  });
}
