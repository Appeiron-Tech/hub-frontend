import ApiService from "@/models/ApiService";
import type {IAnalyticsCountryRegionResponse, IAnalyticsResponse} from "@/views/charts/models/ICharts";


export default class ChartServices extends ApiService{
  constructor() {
    super({ baseURL: "" });
  }

  async getUsersViewsByCountry(): Promise<IAnalyticsResponse>{
     return (await this.get("/analytics/geonetwork/country/2022-05-24")).data ;
  }

  async getUsersViewsByCountryAndDate(country: string,date: string): Promise<IAnalyticsCountryRegionResponse>{
     return (await this.get(`/analytics/geonetwork/region/${country}/${date}`)).data ;
  }
}