import axios from "axios";
import { API_URL } from "@/constant/ConstantCommon";

export function getProducts(requestParams: any) {
  return axios.get(`${API_URL}/admin/products`, requestParams).then((res) => {
    return res.data.data;
  });
}

export function createProduct(requestParams: any) {
  return axios.post(`${API_URL}/admin/products`, requestParams).then((res) => {
    return res.data.data;
  });
}

export function updateProduct(id: string, requestParams: any) {
  return axios.put(`${API_URL}/admin/products/${id}`, requestParams).then((res) => {
    return res.data.data;
  });
}

export function deleteProduct(id: string) {
  return axios.delete(`${API_URL}/admin/products/${id}`).then((res) => {
    return res.data.data;
  });
}