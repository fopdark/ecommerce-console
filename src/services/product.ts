import axios from "axios";
import { API_URL } from "@/constant/ConstantCommon";

export function getProducts(requestParams: any) {
  return axios.get(`${API_URL}/admin/products`, requestParams).then((res) => {
    return res.data.data;
  });
}