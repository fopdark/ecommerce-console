import axios from 'axios';
import { API_URL } from '@/constant/ConstantCommon';

export function getSetting() {
  return axios.get(`${API_URL}/admin/setting`).then((res) => {
    return res.data.data;
  });
}

export function update(id: string, requestParams: any) {
  return axios
    .put(`${API_URL}/admin/setting/${id}`, requestParams)
    .then((res) => {
      return res.data.data;
    });
}
