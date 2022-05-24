import StoreService from "@/views/settings/myEnterprise/services/store/Store.services";
import {reactive} from "vue";
import type {ISchedule, IScheduleSave, IUpdateOpeningHours} from "./models/IScheduleSave";
import { Notify } from 'quasar'

export class Schedule {

  private _sharedServices: StoreService = new StoreService();
  private _allStoresOpeningHours: Array<ISchedule> = [];
  private _selectedStoreOpeningHours: Array<ISchedule> = [];
  private _idForSelectedStore: number | undefined = undefined;
  private _methodToExecute: string = '';

  constructor() {}


  get selectedStoreOpeningHours(): Array<ISchedule> {
    return this._selectedStoreOpeningHours;
  }


  set selectedStoreOpeningHours(value: Array<ISchedule>) {
    this._selectedStoreOpeningHours = structuredClone(value);
  }

  get allStoresOpeningHours(): Array<ISchedule> {
    return this._allStoresOpeningHours;
  }

  set allStoresOpeningHours(value: Array<ISchedule>) {
    this._allStoresOpeningHours = value;
  }

  // async saveSchedule(openingHours: IScheduleSave){
  //   await this._sharedServices.saveOpeningHours(2, openingHours).then(r => console.log({r})).catch(e => console.log({e}));
  // }

  async loadInfo(){
    this._allStoresOpeningHours = Object.assign([], await this._sharedServices.getAllOpeningHours());
    console.log("SHCEFDUUUUULE: ", this._allStoresOpeningHours);
  }

  async getHoursForSelectedStore(selectedStoreId: any): Promise<Array<ISchedule>> {
    console.log("id passed: ", selectedStoreId)
    this._idForSelectedStore = selectedStoreId.id;
    this._selectedStoreOpeningHours = structuredClone(await (this._sharedServices.getOpeningHoursByStoreId(this._idForSelectedStore!)));
    console.log("seected: ", this._selectedStoreOpeningHours);
    return this._selectedStoreOpeningHours;
  }

  removeSpecificRangeHour(rangeHourId: number){
    this._selectedStoreOpeningHours = this._selectedStoreOpeningHours.filter(e => e.id != rangeHourId);
    console.log(this._selectedStoreOpeningHours);
  }

  addRangeHours(weekDay: number, hadExistingHour?: boolean){
    let size = this._selectedStoreOpeningHours.filter(e => e.weekDay === weekDay).length;
    const from = hadExistingHour ? '14:30' : '09:00';
    const to = hadExistingHour ? '19:00' : '13:00';
    const newRangeHour: ISchedule = {
      id: Math.random()+54.33,
      from: from,
      to: to,
      storeId:  this._idForSelectedStore! ,
      weekDay: weekDay
    }
    if (size === 0 && !hadExistingHour){
      this._selectedStoreOpeningHours.push(newRangeHour);
      this._methodToExecute = 'POST';
    }
    else if( hadExistingHour){
      this._selectedStoreOpeningHours.push(newRangeHour);
      this._methodToExecute = 'PATCH';
    }
    console.log("ALAMD", this._methodToExecute)
  }

   async saveInformation() {
     //const a = structuredClone(await (this._sharedServices.getOpeningHoursByStoreId(this._idForSelectedStore!)));
     let wasSavedSuccesfully: boolean | undefined;
     const newOpeningHours = this._selectedStoreOpeningHours.filter(e => e.id.toString().includes('.'));
     if(this._methodToExecute === 'POST'){
       wasSavedSuccesfully = await this._sharedServices.saveOpeningHours(newOpeningHours);
       await this.showNotification(wasSavedSuccesfully);
     }
     else {
       //wasSavedSuccesfully = await this._sharedServices.saveOpeningHours(newOpeningHours);
       //await this.showNotification(wasSavedSuccesfully);
       let newArray: Array<IUpdateOpeningHours>;
       newOpeningHours.forEach(function (value, index, array) {
         newArray[index]
       })
     }


   }

   async showNotification(p_wasCorrectlySaved: boolean) {
     Notify.create({
       message: p_wasCorrectlySaved ? 'Guardado correctamente' : 'Hubo un error',
       type: p_wasCorrectlySaved ? 'positive' : 'negative',
     });
     if (p_wasCorrectlySaved) {
       await this.loadInfo();
     }
   }

}

const scheduleController = reactive(new Schedule());
export default scheduleController;