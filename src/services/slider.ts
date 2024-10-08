import axios from "axios";
import { API_URL } from "@/constant/ConstantCommon";

export function getList(requestParams: any) {
  return axios.get(`${API_URL}/admin/slider`, requestParams).then((res) => {
    return res.data.data;
  });
}

export function create(requestParams: any) {
  return axios.post(`${API_URL}/admin/slider`, requestParams).then((res) => {
    return res.data.data;
  });
}

export function update(id: string, requestParams: any) {
  return axios.put(`${API_URL}/admin/slider/${id}`, requestParams).then((res) => {
    return res.data.data;
  });
}

export function deleteSlider(id: string) {
  return axios.delete(`${API_URL}/admin/slider/${id}`).then((res) => {
    return res.data.data;
  });
}