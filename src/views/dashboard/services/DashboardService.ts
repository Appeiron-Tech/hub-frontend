import TenancyService from "@/services/TenancyService";
import type { IReqGetPaymentList, IReqGetPaymentsByStatus, IReqGetPaymentsByType, IReqGetSummaryStats, IResGetPaymentList, IResGetPaymentsByStatus, IResGetPaymentsByType, IResGetSummaryStats } from "./IDashboardService";

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

  /**
   *
   * @param payload: IReqGetPaymentsByType
   */
   async getPaymentsByType(payload: IReqGetPaymentsByType): Promise<Array<IResGetPaymentsByType>> {
    return (await this.get("/by_type/" + payload.period)).data;
  }

  /**
   *
   * @param payload: IReqGetPaymentsByStatus
   */
  async getPaymentsByStatus(payload: IReqGetPaymentsByStatus): Promise<Array<IResGetPaymentsByStatus>> {
    return (await this.get("/by_status/" + payload.period)).data;
  }

}
