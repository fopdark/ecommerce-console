import { API_URL } from "@/constant/ConstantCommon";
import { uploadFiles } from "@/services/files";

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

export const handleUploadFile = async (images: any) => {
  const res = await Promise.all(
    images.map(async (image: any) => {
      if (!image?.originFileObj) return image;
      const res = await uploadFiles({
        files: [image?.originFileObj],
      });
      return res?.images?.[0];
    }),
  );

  return res?.[0];
};