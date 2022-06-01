// Request Interfaces
//
export interface IResOpeningHours {
  id: number;
  storeId: number;
  weekDay: number;
  from: string;
  to: string;
}

//
// Interfaces
//

export interface ISchedule {
  storeId: number;
  weekDay: number;
  ranges: Array<IHourRange>
}
// export interface IScheduleFormatted {
  
// }

export interface IHourRange {
  from: string;
  to: string;
}

export interface IHourRange {
  from: string;
  to: string;
}


// export interface IUpdateOpeningHours {
//   ranges: Array<IOpeningRange>;
// }
