import ApiService from "@/models/ApiService";
import type {IStore} from "@/views/settings/myEnterprise/components/direction/direction";

export default class StoreService extends ApiService{

  constructor() {
    super({baseURL:'/store'});
  }


  async saveNewStore(p_newStore: IStore): Promise<IStore> {
    const config = {
      params: {
        "p_store": p_newStore
      }
    }
    return (await this.post('/newstore', '', config)).data
  }

  async editExistingStore(p_store: IStore): Promise<IStore>{
    const config = {
      params: {
        "p_store": p_store
      }
    }
    return (await this.patch('/newstore', '', config)).data
  }

  //TODO: IMPLEMMENT THIS FUNCTION
  getAllStores(): Array<IStore>{
    return[
      {
        id:"sdasdasdsadasdasd",
        store: 'MINKA',
        description:'dsdsdsadsada',
        address: 'Av. Benavides 554',
        main: 54524,
        latitude: -12.046373,
        longitude: -77.042755,
        openAlways:45345,
        cityId:524
      },
      {
        id:"sdasdasdsjhjhgjhgjhgjd",
        store: 'SUR',
        description: 'dsdsdsadsada',
        address: 'Av. Pedro miota 457',
        main: 54524,
        latitude: -12.096373,
        longitude: -77.082755,
        openAlways: 45345,
        cityId: 524
      },
      {
        id:"sdasdasdslkiljhkhjmasd",
        store: 'Centro',
        description:'dsdsdsadsada',
        address: 'Av. Grau 127',
        main: 54524,
        latitude: -12.0677913955,
        longitude: -77.0203982517,
        openAlways:45345,
        cityId:524
      }
    ]
  }
}