import axios from "axios";
import { API_URL } from "@/constant/ConstantCommon";

export function getList(requestParams: any) {
  return axios.get(`${API_URL}/admin/policies`, requestParams).then((res) => {
    return res.data.data;
  });
}

export function create(requestParams: any) {
  return axios.post(`${API_URL}/admin/policies`, requestParams).then((res) => {
    return res.data.data;
  });
}

export function update(id: string, requestParams: any) {
  return axios.put(`${API_URL}/admin/policies/${id}`, requestParams).then((res) => {
    return res.data.data;
  });
}

export function deletePolicy(id: string) {
  return axios.delete(`${API_URL}/admin/policies/${id}`).then((res) => {
    return res.data.data;
  });
}