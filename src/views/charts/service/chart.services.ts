import ApiService from "@/models/ApiService";
import type {IAnalyticsResponse} from "@/views/charts/models/ICharts";

export default class ChartServices extends ApiService{
  constructor() {
    super({ baseURL: "" });
  }

  async getUsersViewsByCountry(): Promise<IAnalyticsResponse>{
     return (await this.get("/analytics/geonetwork/2022-05-24")).data ;
  }
}