import ApiService from "@/models/ApiService";
import type {IGeneralSettings} from "@/views/settings/myEnterprise/components/general/IGeneral";

export default class GeneralService extends ApiService {
  constructor() {
    super({ baseURL: "/client" });
  }

  async getClientInformation(): Promise<IGeneralSettings> {
    return (await this.get('')).data;
  }

  async updateClient(p_client: any, id: number){
    return await this.patch(`/${id}`, p_client);
  }
}
