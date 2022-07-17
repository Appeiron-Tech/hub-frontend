import type { IBasicResults } from "@/views/charts/models/ICharts";

export interface IAnalyticsViewsResponse {
  users: number
  sessions: number
  bounceRate: number
  sessionDuration: number
  dates: IBasicResults[]
}