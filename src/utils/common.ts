import { API_URL } from "@/constant/ConstantCommon";

export function convertToSlug(str: string) {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replaceAll(' ', '-')
    .replaceAll(',', '')
    .toLocaleLowerCase();
}

export const getImageUrl = (url:string) => {
  return `${API_URL}/${url}`
}