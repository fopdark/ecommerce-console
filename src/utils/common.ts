import { API_URL } from "@/constant/ConstantCommon";

export function convertToSlug(str: string) {
  console.log('str', str)
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replaceAll(' ', '-')
    .toLocaleLowerCase();
}

export const getImageUrl = (url:string) => {
  return `${API_URL}/${url}`
}