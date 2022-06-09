import ApiService from "@/models/ApiService";

export default class GeneralService extends ApiService {
  constructor() {
    super({ baseURL: "/client" });
  }

  async getClientInformation() {
    return await this.get("");
  }
}
