import {reactive} from "vue";
import StoreService from "@/views/settings/myEnterprise/components/direction/services/Store.services";

export interface IStore {
  id: string;
  store: string;
  description: string;
  address: string;
  main: number;
  latitude: number;
  longitude: number;
  openAlways: number;
  cityId?: number;
  placeLink?: string;
  address_components?: Array<IAddressComponent>
}

interface IAddressComponent{
  long_name: string,
  short_name: string,
  types: Array<string>
}

export class DirectionController{

  private _m_stores: Array<IStore>  = [];

  private _m_storeService : StoreService = new StoreService();

  constructor() {}


  get Stores(): Array<IStore> {
    return this._m_stores;
  }

  set Stores(value: Array<IStore>) {
    this._m_stores = value;
  }

  loadInfo(){
    this._m_stores = Object.assign([], this._m_storeService.getAllStores());
  }

  saveOrEditNewStore(p_store: IStore, isNew: boolean){
    if(isNew){
      this._m_storeService.saveNewStore(p_store).then(r => console.log(r));
    }
    else {
      this._m_storeService.editExistingStore(p_store).then(r => console.log(r));
    }
  }

}

const directionController = reactive(new DirectionController());
export default directionController;