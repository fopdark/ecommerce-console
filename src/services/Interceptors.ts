import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const refreshToken = async () => {
  return "newToken";
};

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  // console.info(`[request] [${JSON.stringify(config)}]`);
  const access_token = localStorage.getItem("access_token");
  console.log('access_token',access_token)
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  // console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // console.info(`[response] response`, response?.data);
  // if (response?.data?.data?.meta?.access_token?.token) {
  //   localStorage.setItem(
  //     "authToken",
  //     response?.data?.data?.meta?.access_token?.token
  //   );
  //   window.location.href = "/"
  // }
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  const status = error.response ? error.response.status : null;

  if (status === 401) {
    // Handle unauthorized access
  } else if (status === 404) {
    // Handle not found errors
  } else {
    // Handle other errors
  }
  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);

  // axiosInstance.interceptors.response.use(onResponse, onResponseError);
  axiosInstance.interceptors.response.use(onResponse, async function (error) {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      // Handle unauthorized access
      // const newToken = await refreshToken();
      // localStorage.setItem("authToken", newToken);
      // Retry the original request
      // return axiosInstance(error.config);
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    } else if (status === 404) {
      // Handle not found errors
      console.log("page not found");
      // window.location.href = "/404";
    } else {
      // Handle other errors
      console.log("response error", error);
    }
    return Promise.reject(error);
  });
  return axiosInstance;
}
