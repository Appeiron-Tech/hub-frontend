export interface IReqGetPaymentList {
	period: string
}

export interface IResGetPaymentList {
  mp_id: string
  operation_type: string
  card_id_type: string
  card_id_number: string
  card_first_six_digits: string
  date_approved: Date
  date_created: Date
  api_call_id: string
  fee_details_amount: number
  fee_details_type: string
  installments: number
  order_type: string
  payment_method_id: string
  payment_type_id: string
  status: string
  status_detail: string
  taxes_amount: number
  transaction_amount: number
  trans_net_amount: number
  trans_total_amount: number
}

export interface IReqGetSummaryStats {
	period: string
}

interface IStatsByTime {
  time: string
  sell_quantity: string
  sells: string
  ticket_avg: string
}

export interface IPeriodSummaryStats {
  init_time: string; // Date
  finish_time: string; // Date
  sell_quantity: string; // number
  sells: string; // number
  ticket_avg: string; // number
  stats_by_time?: IStatsByTime[]
}

export interface IResGetSummaryStats {
  prev: IPeriodSummaryStats;
  current: IPeriodSummaryStats;
}

export interface IReqGetPaymentsByType {
	period: string
}

export interface IResGetPaymentsByType {
  payment_type: string
  amount: number
  quantity: number
}

export interface IReqGetPaymentsByStatus {
	period: string
}

export interface IResGetPaymentsByStatus {
  status: string
  quantity: number
}