import type { IProfile } from "./IUser";
import { normalizeClass } from "vue";
import AuthService from "@/services/auth.services";
import tokenService from "@/services/tokenStorage/token.services";
import type { ILoginForm, IResLogin } from "@/services/interfaces/IAuth";

export default class User {
  m_name: string | null = null;
  m_password: string | null = null;
  m_profile: IProfile | null = null;

  m_apiService = new AuthService();

  constructor() {}

  get name(): string | null {
    return this.m_name;
  }

  set name(p_name) {
    this.m_name = p_name;
  }

  get password(): string | null {
    return this.m_password;
  }

  set password(p_value: string | null) {
    this.m_password = p_value;
  }

  public getAccessToken(): string | null {
    return tokenService.getToken();
  }

  get mprofile(): IProfile | null {
    return this.m_profile;
  }
  set profile(p_value: IProfile | null) {
    this.m_profile = p_value;
  }

  getIsAuthenticated(): boolean {
    return tokenService.getToken() != null && tokenService.getToken() !== "";
  }

  async doLogin(p_loginForm: ILoginForm): Promise<boolean> {
    const rsLogin: IResLogin | null = await this.m_apiService.doLogin({
      email: p_loginForm.email,
      password: p_loginForm.password,
    });
    if (rsLogin !== null) {
      this.m_password = null;
      tokenService.saveToken(rsLogin.access_token);
      // this.m_tokenService.saveRefreshToken(rsLogin.access_token)
      this.m_apiService.setHeader();
      await this.getProfile();
      // ApiService.setHeader(rsLogin.access_token)
      return true;
    }

    return false;
  }

  async getProfile(): Promise<void> {
    this.m_profile = await this.m_apiService.getProfile();
    //TODO: check if is correct to uncomment the following code:
    //i18n.global.locale.value = this.m_profile.language!!;
  }

  async logout(): Promise<void> {
    tokenService.removeToken();
  }
}
