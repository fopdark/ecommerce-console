import axios from "axios";
import { API_URL } from "@/constant/ConstantCommon";

export function getCustomerRequestList(requestParams: any) {
  return axios.get(`${API_URL}/admin/customers`, requestParams).then((res) => {
    return res.data.data;
  });
}