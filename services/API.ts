import Config from "react-native-config";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import auth from "@react-native-firebase/auth";

export class API {
  instance: AxiosInstance;
  baseUrl: string;
  token: string | null = null;

  constructor() {
    this.baseUrl = Config.API_URL ?? "";
    this.instance = axios.create({ baseURL: this.baseUrl, timeout: 10000 });
    console.debug("CONNECTED API URL: ", this.baseUrl ?? "");
    this.setupinterceptor();
  }

  setupinterceptor = () => {
    this.instance.interceptors.request.use(async (config) => {
      const user = auth().currentUser;
      if (user && user.emailVerified) {
        const { token } = await user.getIdTokenResult(true);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    });
  };

  get = async <REQ, RES = undefined>(
    url: string,
    config?: AxiosRequestConfig | undefined,
  ): Promise<AxiosResponse<RES>> => {
    // this.logger.debug("GET: ", { url, config });
    const response = await this.instance.get<REQ, AxiosResponse<RES>>(url, config);
    return response;
  };

  post = async <REQ, RES = undefined>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig | undefined,
  ): Promise<AxiosResponse<RES>> => {
    // this.logger.debug("POST: ", { url, data, config });
    const response = await this.instance.post<REQ, AxiosResponse<RES>>(url, data, config);
    // this.logger.debug("POST: ", response);

    return response;
  };

  put = async <REQ, RES = undefined>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig | undefined,
  ): Promise<AxiosResponse<RES>> => {
    console.debug("PUT: ", { url, data, config });
    const response = await this.instance.put<REQ, AxiosResponse<RES>>(url, data, config);
    console.debug("PUT: ", response);

    return response;
  };

  patch = async <REQ, RES = undefined>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig | undefined,
  ): Promise<AxiosResponse<RES>> => {
    console.debug("PATCH: ", { url, data, config });
    const response = await this.instance.patch<REQ, AxiosResponse<RES>>(url, data, config);
    console.debug("PATCH: ", response);

    return response;
  };

  delete = async <REQ, RES = undefined>(
    url: string,
    config?: AxiosRequestConfig | undefined,
  ): Promise<AxiosResponse<RES>> => {
    console.debug("DELETE: ", { url, config });
    const response = await this.instance.delete<REQ, AxiosResponse<RES>>(url, config);
    console.debug("DELETE: ", response);

    return response;
  };
}
export const api = new API();
