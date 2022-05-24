import ApiService from "@/models/ApiService";
import type {IStore, IStoreSave} from "@/views/settings/myEnterprise/components/direction/direction";
import type {ITeamSave} from "@/views/settings/myEnterprise/components/team/teamTable/models/ITeam";
import type {
  ISchedule,
  IUpdateOpeningHours
} from "@/views/settings/myEnterprise/components/schedule/models/IScheduleSave";


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

  async getAllOpeningHours(): Promise<Array<ISchedule>>{
    return (await this.get('/openingHours')).data;
  }


  async getOpeningHoursByStoreId(p_storeId: number): Promise<Array<ISchedule>>{
    return (await this.get(`/${p_storeId}/openingHours`)).data;
  }

  async saveOpeningHours(p_hourRange: Array<ISchedule>): Promise<boolean>{
    let allResponses: Array<any> = [];
    let singleRespose: any;
    for (const key of Object.keys(p_hourRange)) {
      // @ts-ignore
      const {storeId, to, weekDay, from} = p_hourRange[key];
      singleRespose= await this.post(`/${storeId}/openingHour`, {
        "weekDay": weekDay,
        "ranges": [{
          "from": from,
          "to": to
        }]
      })
       if (singleRespose.statusText.toUpperCase() != 'CREATED'){
         allResponses.push(singleRespose);
       }
    }
    console.table(allResponses);
    return allResponses.length == 0;
  }


  async updateOpeningHours(p_hourRange: Array<ISchedule>){
    let allResponses: Array<any> = [];
    let singleRespose: any;

    for (const key of Object.keys(p_hourRange)) {
      // @ts-ignore
      const {storeId, to, weekDay, from} = p_hourRange[key];
      singleRespose= await this.patch(`/${storeId}/openingHour/${weekDay}`, {
        "ranges": [{
          "from": from,
          "to": to
        }]
      })
      if (singleRespose.statusText.toUpperCase() != 'CREATED'){
        allResponses.push(singleRespose);
      }
    }
  }



}