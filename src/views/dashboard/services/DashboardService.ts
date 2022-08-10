import TenancyService from "@/services/TenancyService";
import type { IReqGetPaymentList, IReqGetSummaryStats, IResGetPaymentList, IResGetSummaryStats } from "./IDashboardService";

export default class DashboardService extends TenancyService {
  constructor() {
    super("/pay/dashboard" );
  }

  //****************************************************** */
  //********** DASHBOARD ********************************* */
  //****************************************************** */
  /**
   *
   * @param payload: IReqGetSummaryStats
   */
  async getSummaryStats(payload: IReqGetSummaryStats): Promise<IResGetSummaryStats> {
    return (await this.get("/payments/" + payload.period)).data;
  }

  /**
   *
   * @param payload: IReqGetPaymentList
   */
  async getPaymentList(payload: IReqGetPaymentList): Promise<Array<IResGetPaymentList>> {
    return (await this.get("/paymentlist/" + payload.period)).data;
  }

}
