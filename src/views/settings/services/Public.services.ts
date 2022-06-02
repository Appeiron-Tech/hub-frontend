import { API_PUBLIC_BASE_URL } from "@/constants";
import ApiService from "@/models/ApiService";
import type { IProfileForEditing } from "@/models/user/IUser";

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
    console.log("%c⧭", "color: #cc0088", p_email);
    return await this.patch("/user/" + p_email, p_user);
  }
}
