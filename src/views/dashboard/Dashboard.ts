import { reactive } from "vue";
import type { IPaymentList, IPaymentsByStatus, IPaymentsByType, ISummaryStats } from "./IDashboard";
import DashboardService from "./services/DashboardService";

export class Dashboard {
  private _summaryStats: ISummaryStats | null = null;
	private _paymentList: Array<IPaymentList> = [];
  private _paymentsByType: Array<IPaymentsByType> = [];
  private _paymentsByStatus: Array<IPaymentsByStatus> = [];

  // Services
  private _apiService = new DashboardService();

  constructor() {
    // Constructor definition
  }

	get paymentList(): Array<IPaymentList>{
		return this._paymentList
	}
	set paymentList(value: Array<IPaymentList>){
		this._paymentList = value;
	}

  get summaryStats(): ISummaryStats | null {
    return this._summaryStats;
  }

  set summaryStats(value: ISummaryStats | null) {
    this._summaryStats = value;
  }

  get paymentsByType(): Array<IPaymentsByType> {
    return this._paymentsByType;
  }

  set paymentsByType(value: Array<IPaymentsByType>) {
    this._paymentsByType = value;
  }

  get paymentsByStatus(): Array<IPaymentsByStatus> {
    return this._paymentsByStatus;
  }

  set paymentsByStatus(value: Array<IPaymentsByStatus>) {
    this._paymentsByStatus = value;
  }

  /***************
   * Methods
   ***************/

  /**
   *
   * @param period: string
   */
	public async loadInfo(period: string): Promise<void> {

		this._paymentList = await this._apiService.getPaymentList({period: period});

    this._paymentsByType = await this._apiService.getPaymentsByType({period: period});
    
    // const _rs = this._paymentsByType;
    // _rs.push({
    //     "payment_type": "credit",
    //     "amount": Number("140.94000"),
    //     "quantity": Number("2")
    // })
    // _rs.push({
    //     "payment_type": "credit-2",
    //     "amount": Number("110.94000"),
    //     "quantity": Number("2")
    // })
    // this._paymentsByType = _rs;

    this._paymentsByStatus = await this._apiService.getPaymentsByStatus({period: period});

    const _rsSummaryStats = await this._apiService.getSummaryStats({period: period})
    // Inferring types
    this._summaryStats = {
      current: {
        init_time: _rsSummaryStats.current.init_time,
        finish_time: _rsSummaryStats.current.finish_time,
        sell_quantity: Number(_rsSummaryStats.current.sell_quantity),
        sells: Number(_rsSummaryStats.current.sells),
        ticket_avg: Number(_rsSummaryStats.current.ticket_avg),
        stats_by_time: _rsSummaryStats.current.stats_by_time?.map((_byTime) => {
                                                          return {
                                                            time: _byTime.time,
                                                            sell_quantity: Number(_byTime.sell_quantity),
                                                            sells: Number(_byTime.sells),
                                                            ticket_avg: Number(_byTime.ticket_avg)
                                                          }
                                                        })
      },
      prev: {
        init_time: _rsSummaryStats.prev.init_time,
        finish_time: _rsSummaryStats.prev.finish_time,
        sell_quantity: Number(_rsSummaryStats.prev.sell_quantity),
        sells: Number(_rsSummaryStats.prev.sells),
        ticket_avg: Number(_rsSummaryStats.prev.ticket_avg),
        stats_by_time: _rsSummaryStats.prev.stats_by_time?.map((_byTime) => {
                                                          return {
                                                            time: _byTime.time,
                                                            sell_quantity: Number(_byTime.sell_quantity),
                                                            sells: Number(_byTime.sells),
                                                            ticket_avg: Number(_byTime.ticket_avg)
                                                          }
                                                        })
      }
    }
  }
}

const dashboard = reactive(new Dashboard());
export default dashboard;
