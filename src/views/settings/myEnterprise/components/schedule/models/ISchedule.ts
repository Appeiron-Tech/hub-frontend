export interface ISchedule {
  weekDay: number;
  ranges: Array<IOpeningRange>
}

export interface IOpeningRange {
  from: string;
  to: string;
}