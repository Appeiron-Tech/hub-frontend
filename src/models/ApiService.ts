import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { API_PREFIX_BASE } from "@/constants";
import { createErrorNotification } from "@/utils/notifications";
import tokenService from "@/services/tokenStorage/token.services";
import { StatusCodes } from "http-status-codes";
import router from "@/plugins/router"

// https://medium.com/@zitko/structuring-a-vue-project-authentication-87032e5bfe16
abstract class ApiService {
  private readonly _baseUrl: string = "";
  private _fullApiBase: string ='';

  //TODO: cambiar apiPrefix
  //NOTE: apiPrefix se debería quitar cuando login sea una app a parte.
  constructor(config: { baseURL: string }, serviceProxy?: string) {
    this._baseUrl = config.baseURL;
    this._fullApiBase = serviceProxy ??  API_PREFIX_BASE + this._baseUrl;
    this.setHeader();
  }

  /****************
   * Methods
   ****************/
  public setHeader() {
    axios.defaults.withCredentials = true;
    //axios.defaults.headers.common["Authorization"] = `Bearer ${tokenService.getToken()}`
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
        if (error.response?.status == StatusCodes.UNAUTHORIZED){
          tokenService.removeToken();
          router.push("/login")
        }
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
        if (error.response?.status == StatusCodes.UNAUTHORIZED){
          tokenService.removeToken();
          router.push("/login")
        }
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
        if (error.response?.status == StatusCodes.UNAUTHORIZED){
          tokenService.removeToken();
          router.push("/login")
        }
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
        if (error.response?.status == StatusCodes.UNAUTHORIZED){
          tokenService.removeToken();
          router.push("/login")
        }
        return Promise.reject(error.response);
      });
  }

  // put(resource, data) {
  //	 return axios.put(resource, data)
  // }

  protected async delete(url: string) {
    return axios
      .delete(this._fullApiBase + url)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error: AxiosError) => {
        if (error.response?.status == StatusCodes.UNAUTHORIZED){
          tokenService.removeToken();
          router.push("/login")
        }
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
