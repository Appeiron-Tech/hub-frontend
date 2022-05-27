import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { API_PREFIX_BASE } from "@/constants";
import { createErrorNotification } from "@/utils/notifications";

// https://medium.com/@zitko/structuring-a-vue-project-authentication-87032e5bfe16
abstract class ApiService {
  private readonly _baseUrl: string = "";
  private _fullApiBase: string = API_PREFIX_BASE;

  constructor(config: { baseURL: string }) {
    this._baseUrl = config.baseURL;
    this._fullApiBase = API_PREFIX_BASE + this._baseUrl;
    console.log(this._fullApiBase);
    this.setHeader();
  }

  /****************
   * Methods
   ****************/
  public setHeader() {
    axios.defaults.headers.common["Authorization"] = `Bearer xxxxxxx`;
  }

  protected removeHeader() {
    axios.defaults.headers.common = {};
  }

  protected async get(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return axios
      .get(this._fullApiBase + url, config)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error.response);
      });
  }

  protected async post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return axios
      .post(this._fullApiBase + url, data, config)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error: AxiosError) => {
        createErrorNotification("Hubo un error");
        return Promise.reject(error.response);
      });
  }

  protected async patch(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return axios
      .patch(this._fullApiBase + url, data, config)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error: AxiosError) => {
        createErrorNotification("Hubo un error");
        return Promise.reject(error.response);
      });
  }

  protected async head(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return axios
      .head(this._fullApiBase + url, config)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error.response);
      });
  }

  // put(resource, data) {
  //	 return axios.put(resource, data)
  // }

  delete(url: string) {
    return axios
      .delete(this._fullApiBase + url)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error: AxiosError) => {
        createErrorNotification("Hubo un error");
        return Promise.reject(error.response);
      });
  }

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *  - username
   *  - password
   **/
  // customRequest(data) {
  //	 return axios(data)
  // }
}

export default ApiService;
