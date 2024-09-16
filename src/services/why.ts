import axios from "axios";
import { API_URL } from "@/constant/ConstantCommon";

export function getBenefits(requestParams: any) {
  return axios.get(`${API_URL}/admin/benefits`, requestParams).then((res) => {
    return res.data.data;
  });
}

export function create(requestParams: any) {
  return axios.post(`${API_URL}/admin/benefits`, requestParams).then((res) => {
    return res.data.data;
  });
}

export function update(id: string, requestParams: any) {
  return axios.put(`${API_URL}/admin/benefits/${id}`, requestParams).then((res) => {
    return res.data.data;
  });
}