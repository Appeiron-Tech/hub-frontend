import StoreService from "@/views/settings/myEnterprise/services/store/Store.services";
import {reactive} from "vue";
import type {ISchedule} from "@/views/settings/myEnterprise/components/schedule/models/ISchedule";

export class Schedule {
  private _sharedServices: StoreService = new StoreService();

  constructor() {}

  async saveSchedule(openingHours: ISchedule){
    await this._sharedServices.saveOpeningHours(2, openingHours).then(r => console.log({r})).catch(e => console.log({e}));
  }
}

const scheduleController = reactive(new Schedule());
export default scheduleController;