export enum EPeriod {
  TODAY = "TODAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
  MONTH3 = "MONTH3",
  MONTH6 = "MONTH6",
  YEAR = "YEAR"
}

export const PeriodList = [
  {label: "calendar-today", value: EPeriod.TODAY},
  {label: "calendar-week", value: EPeriod.WEEK},
  {label: "calendar-month", value: EPeriod.MONTH},
  {label: "calendar-3months", value: EPeriod.MONTH3},
  {label: "calendar-6months", value: EPeriod.MONTH6},
  {label: "calendar-year", value: EPeriod.YEAR}
]



export function formatDateToDayMonthYear(date: Date): string {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}
