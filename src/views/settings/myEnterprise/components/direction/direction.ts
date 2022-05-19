import {reactive} from "vue";
import StoreService from "@/views/settings/myEnterprise/services/store/Store.services";
import type {ITeam} from "@/views/settings/myEnterprise/components/team/teamTable/models/ITeam";

export interface IStore {
  id: number;
  store: string;
  description: string;
  address: string;
  isMain: number;
  latitude: number;
  longitude: number;
  isOpenAlways: number;
  createdAt?: Date;
  cityId?: number;
  placeLink?: string;
  address_components?: Array<IAddressComponent>;
  country?: string;
  phones?: Array<IPhone>;
  workers?: Array<ITeam>;
}

export interface IStoreSave {
  id?: string;
  store: string;
  description?: string;
  address_components?: Array<IAddressComponent>;
  placeLink?: string;
  address: string;
  isMain: number;
  latitude?: number;
  longitude?: number;
  isOpenAlways: number;
  phones?: Array<IPhone>;
  cityId?: number;
}

interface IAddressComponent {
  long_name: string;
  short_name: string;
  types: Array<string>;
}

interface IPhone {
  phone: string;
  countryCode: string;
  type: string;
  isWspMain: string;
}

export interface ICountry {
  name: string;
  image: string;
}

export class DirectionController {
  private _m_stores: Array<IStore> = [];

  private _m_storeService: StoreService = new StoreService();
  private _markers: Array<{ position: { lat: number; lng: number } }> = [];
  private _centerMap: { lat: number; lng: number } = {lat: 0, lng: 0};

  constructor() {
  }

  get centerMap(): { lat: number; lng: number } {
    return this._centerMap;
  }

  get markers(): Array<{ position: { lat: number; lng: number } }> {
    return this._markers;
  }

  set centerMap(center: { lat: number; lng: number }) {
    this._centerMap = center;
  }

  get Stores(): Array<IStore> {
    return this._m_stores;
  }

  set Stores(value: Array<IStore>) {
    this._m_stores = value;
  }

  async loadInfo() {
    this._m_stores = Object.assign(
      [],
      await this._m_storeService.getAllStores()
    );
    this._markers = Object.assign(
      [],
      this._m_stores.map((e) => {
        return {
          position: {
            lat: parseFloat(String(e.latitude)),
            lng: parseFloat(String(e.longitude)),
          },
        };
      })
    );
    this._centerMap = this._markers
      .map((e) => {
        return {
          lat: e.position.lat,
          lng: e.position.lng,
        };
      })
      .reduce(function (acumulator, nextValue) {
        return {
          lat: parseFloat(String(acumulator.lat + nextValue.lat)),
          lng: parseFloat(String(acumulator.lng + nextValue.lng)),
        };
      });
    this.centerMap.lat = this.centerMap.lat / this.markers.length;
    this._centerMap.lng = this.centerMap.lng / this.markers.length;
  }

  saveOrEditNewStore(p_store: IStoreSave, isNew: boolean) {
    console.log({p_store});
    if (isNew) {
      this._m_storeService.saveNewStore(p_store).then((r) => console.log(r));
    } else {
      this._m_storeService
        .editExistingStore(p_store)
        .then((r) => console.log(r));
    }
  }

  removeStore(p_store: IStore){
    this._m_storeService.deleteStore(p_store.id).then(r => console.log(r));
  }
}

const directionController = reactive(new DirectionController());
export default directionController;
