import ApiService from "@/models/ApiService";
import type {
  ITeam,
  ITeamSave,
} from "@/views/settings/myEnterprise/components/team/teamTable/models/ITeam";
import type {
  ISchedule,
  IUpdateOpeningHours,
} from "@/views/settings/myEnterprise/components/schedule/models/IScheduleSave";
import type { AxiosResponse } from "axios";
import type {
  IStore,
  IStoreSave,
} from "@/views/settings/myEnterprise/components/direction/IDirection";

export default class StoreService extends ApiService {
  constructor() {
    super({ baseURL: "/store" });
  }

  //****************************************************** */
  //**********S T O R  E S     ******************************* */
  //******************************************************* */
  /**
   *
   * @param p_newStore
   */
  async saveNewStore(p_newStore: IStoreSave): Promise<AxiosResponse> {
    return await this.post("", p_newStore);
  }

  /**
   *
   * @param p_store
   */
  async editExistingStore(p_store: IStoreSave): Promise<AxiosResponse> {
    return await this.patch(`/${p_store.id}`, p_store);
  }

  async getAllStores(): Promise<Array<IStore>> {
    return (await this.get("")).data;
  }

  async deleteStore(p_storeId: number) {
    return await this.delete(`/${p_storeId}`);
  }

  //****************************************************** */
  //**********W O R K E R S      ******************************* */
  //******************************************************* */

  /**
   *
   * @param p_collaborator
   * @param p_storeId
   */
  async createNewCollaborator(p_collaborator: ITeamSave, p_storeId: number) {
    const response = await this.post(`/${p_storeId}/worker`, p_collaborator);
    return response;
  }
  /**
   *
   * @param p_collaborator
   * @param p_workerId
   */
  async editExistingWorker(p_collaborator: any, p_workerId: number) {
    const response = await this.patch(`/worker/${p_workerId}`, p_collaborator);

    return response;
  }

  /**
   *
   * @param p_workerId
   */
  async deleteWorker(p_workerId: number) {
    return await this.delete(`/worker/${p_workerId}`);
  }

  async getAllCollaborators(): Promise<Array<ITeam>> {
    return (await this.get("/allWorkers")).data;
  }

  //****************************************************** */
  //**********OPENING HOURS     ******************************* */
  //******************************************************* */

  async getAllOpeningHours(): Promise<Array<ISchedule>> {
    return (await this.get("/openingHours")).data;
  }

  async getOpeningHoursByStoreId(p_storeId: number): Promise<Array<ISchedule>> {
    return (await this.get(`/${p_storeId}/openingHours`)).data;
  }

  async saveOpeningHours(p_hourRange: Array<ISchedule>): Promise<boolean> {
    let allResponses: Array<any> = [];
    let singleRespose: any;
    for (const key of Object.keys(p_hourRange)) {
      // @ts-ignore
      const { storeId, to, weekDay, from } = p_hourRange[key];
      singleRespose = await this.post(`/${storeId}/openingHour`, {
        weekDay: weekDay,
        ranges: [
          {
            from: from,
            to: to,
          },
        ],
      });
      if (singleRespose.statusText.toUpperCase() != "CREATED") {
        allResponses.push(singleRespose);
      }
    }
    console.table(allResponses);
    return allResponses.length == 0;
  }

  async updateOpeningHours(p_hourRange: Array<ISchedule>) {
    let allResponses: Array<any> = [];
    let singleRespose: any;

    for (const key of Object.keys(p_hourRange)) {
      // @ts-ignore
      const { storeId, to, weekDay, from } = p_hourRange[key];
      singleRespose = await this.patch(`/${storeId}/openingHour/${weekDay}`, {
        ranges: [
          {
            from: from,
            to: to,
          },
        ],
      });
      if (singleRespose.statusText.toUpperCase() != "CREATED") {
        allResponses.push(singleRespose);
      }
    }
  }
}
