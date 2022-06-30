export interface IAnalyticsResponse {
  pageViews: string
  sessions: string
  users: string
  countries: ICountryResults[]
}

export interface ICountryResults {
  country: string
  pageViews: string
  sessions: string
  users: string
}

export interface IAnalyticsForCharts {
  data: Array<IAnalyticsChart>;
}

interface IAnalyticsChart {
  country: string;
  pageViews: number;
}


