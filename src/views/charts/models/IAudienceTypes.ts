import type { IAnalyticsAudienceData } from "@/views/charts/models/ICharts";

export interface IAnalyticsAudienceGenResponse {
  sessions: number
  users: number
  newUsers: number
  bounceRate: number
  viewsPerSession: number
  avgSessionDuration: number
  data: IAnalyticsAudienceData[]
}


