import ApiService from "@/models/ApiService";
import type {IStore, IStoreSave} from "@/views/settings/myEnterprise/components/direction/direction";
import type {ITeam, ITeamSave} from "@/views/settings/myEnterprise/components/team/teamTable/models/ITeam";
import type {AxiosResponse} from "axios";
import type {ISchedule} from "@/views/settings/myEnterprise/components/schedule/models/ISchedule";

export default class StoreService extends ApiService{

  constructor() {
    super({baseURL:'/store'});
  }


  async saveNewStore(p_newStore: IStoreSave): Promise<IStore | void> {
    await this.post('', p_newStore).then(e => console.log(e.data)).then(r => console.log(r))
  }

  async editExistingStore(p_store: IStoreSave): Promise<void>{
    return (await this.patch(`/${p_store.id}`, p_store ).then(e => console.log(e)).catch(r => console.log(r)));
  }

  async getAllStores(): Promise<Array<IStore>> {
    return (await this.get('')).data;
  }

  async createNewCollaborator(p_collaborator: ITeamSave, p_storeId: number){
    return (await this.post(`/${p_storeId}/worker`,p_collaborator).then(e => console.log({e})).catch(r => console.log({r})));
  }

  async deleteStore(p_storeId: number){
    return (await this.delete(`/${p_storeId}`));
  }

  async getAllOpeningHours(){
    return (await this.get('openingHours'));
  }


  async getOpeningHoursByStoreId(p_storeId: number){
    return (await this.get(`/${p_storeId}/openingHours`));
  }

  async saveOpeningHours(p_storeId: number, p_hours: ISchedule){
    return (await this.post(`/${p_storeId}/openingHour`, p_hours));
  }



}