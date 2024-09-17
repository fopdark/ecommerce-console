import axios from "axios";
import { API_URL } from "@/constant/ConstantCommon";

export function getFeedbacks(requestParams: any) {
  return axios.get(`${API_URL}/admin/feedbacks`, requestParams).then((res) => {
    return res.data.data;
  });
}

export function createFeedback(requestParams: any) {
  return axios.post(`${API_URL}/admin/feedbacks`, requestParams).then((res) => {
    return res.data.data;
  });
}

export function updateFeedback(id: string, requestParams: any) {
  return axios.put(`${API_URL}/admin/feedbacks/${id}`, requestParams).then((res) => {
    return res.data.data;
  });
}

export function deleteFeedback(id: string) {
  return axios.delete(`${API_URL}/admin/feedbacks/${id}`).then((res) => {
    return res.data.data;
  });
}