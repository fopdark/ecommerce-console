import axios from "axios";
import { API_URL } from "@/constant/ConstantCommon";

export function getList(requestParams: any) {
  return axios.get(`${API_URL}/admin/policy`, requestParams).then((res) => {
    return res.data.data;
  });
}

export function create(requestParams: any) {
  return axios.post(`${API_URL}/admin/policy`, requestParams).then((res) => {
    return res.data.data;
  });
}

export function update(id: string, requestParams: any) {
  return axios.put(`${API_URL}/admin/policy/${id}`, requestParams).then((res) => {
    return res.data.data;
  });
}

export function deletePolicy(id: string) {
  return axios.delete(`${API_URL}/admin/policy/${id}`).then((res) => {
    return res.data.data;
  });
}