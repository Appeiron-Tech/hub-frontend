import { API_PUBLIC_BASE_URL } from "@/constants";
import ApiService from "@/models/ApiService";
import type { IProfileForEditing } from "@/models/user/IUser";
import type { IPrivacy } from "../ISettings";

export default class PublicService extends ApiService {
  constructor() {
    super({ baseURL: "/public" }, API_PUBLIC_BASE_URL);
  }
  /**
   * It takes a user object, and sends it to the server
   * @param {IProfileForEditing} p_user - IProfileForEditing
   * @returns The result of the post method.
   */

  async editUser(p_user: IProfileForEditing, p_email: string) {
    return await this.patch("/user/" + p_email, p_user);
  }

  async editUserPrivacy(p_email: string, p_privacy: IPrivacy) {
    return await this.patch(`/user/${p_email}/privacy`, p_privacy);
  }

  async editUserPhoto(p_email: string, p_formData: FormData) {
    return await this.patch(`/user/upload/${p_email}`, p_formData);
  }
}
