import { reactive } from "vue";
import type { IPaymentList, ISummaryStats } from "@/views/dashboard/IDashboard";
import DashboardService from "@/views/dashboard/services/DashboardService";

export class Payment {
	private _paymentList: Array<IPaymentList> = [];

  // Services
  private _apiDashboardService = new DashboardService();

  constructor() {
    // Constructor definition
  }

	get paymentList(): Array<IPaymentList>{
		return this._paymentList
	}
	set paymentList(value: Array<IPaymentList>){
		this._paymentList = value;
	}

  /***************
   * Methods
   ***************/

  /**
   *
   * @param period: string
   */
	public async loadInfo(period: string): Promise<void> {
		this._paymentList = await this._apiDashboardService.getPaymentList({period: period})
  }
}

const payment = reactive(new Payment());
export default payment;
