import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { COUNTRY } from "@/constants/Country";

dayjs.extend(utc);
dayjs.extend(timezone);

export const FormatDate = (date: string) => {
  return dayjs(date).utc().format("YYYY-MM-DD");
};

export const FormatDateTime = (date: string) => {
  return dayjs(date).utc().format("YYYY-MM-DD HH:mm:ss");
};

export const FormatTime = (date: string) => {
  return dayjs(date).utc().format("HH:mm:ss");
};

export const removeEmpty = (obj: any) => {
  Object.keys(obj).forEach((k) => !obj[k] && delete obj[k]);
  return obj;
};

export const getListCountry = () => {
  let arr = Object.values(COUNTRY);
  const result = new Map(arr.map((i) => [i.dial_code, i]));
  return result;
};

export const getOptionsCountry = () => {
  let array = Object.values(COUNTRY);
  let result = array.map((item) => {
    return {
      key: `${item?.dial_code}${item.name}`,
      label: `${item?.dial_code} ${item.name}`,
      value: item?.dial_code.slice(1),
    };
  });
  result.unshift({
    label: "All",
    value: "",
    key: "all",
  });
  return result;
};