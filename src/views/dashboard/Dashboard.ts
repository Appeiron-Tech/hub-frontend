import { reactive } from "vue";
import type { IPaymentList, ISummaryStats } from "./IDashboard";
import DashboardService from "./services/DashboardService";

export class Dashboard {
  private _summaryStats: ISummaryStats | null = null;
	private _paymentList: Array<IPaymentList> = [];

  // Services
  private _apiService = new DashboardService();

  /**
   * Cache
   */
  // private _cache: boolean = true;
  // private __dateFilter: IDateRange | null = null;
  // private __prvDateRange: IDateRange | null = null;

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

  // get prvSummaryStats(): ISummaryStats {
  //   return this._prvSummaryStats;
  // }

  // set prvSummaryStats(p_val: ISummaryStats) {
  //   this._prvSummaryStats = p_val;
  // }

  /***************
   * Methods
   ***************/
  /**
   * 
   */
  // public killCache(): void {
	// 	this.__dateFilter = null
	// }

  /**
   *
   * @param daysAgo: number
   */
	// public async loadInfo(daysAgo: number): Promise<void> {
	public async loadInfo(period: string): Promise<void> {

		this._paymentList = await this._apiService.getPaymentList({period: period})

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