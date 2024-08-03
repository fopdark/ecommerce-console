import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export function getSliderList(requestParams: any) {
  return axios.get(`${API_URL}/admin/slider`, requestParams).then((res) => {
    return res.data.data;
  });
}