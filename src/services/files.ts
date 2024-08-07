import axios from 'axios';
import { API_URL } from '@/constant/ConstantCommon';

export function uploadFiles(request: any) {
  console.log('request', request)
  return axios
    .post(`${API_URL}/admin/files/upload`, request, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
    .then((res) => {
      console.log("res File",res)
      return res.data;
    });
}