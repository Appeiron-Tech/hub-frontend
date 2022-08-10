<template>
  <CardSectionWrapper v-bind="{title: paymentTableRows.title}">
		<q-table
      :rows="paymentTableRows.rows"
      :columns="columns"
      row-key="mp_id"
    >
    <template #body-cell-date_approved="props">
        <q-td :props="props">
          <span style="white-space: initial;">
            <!-- {{ new Date(props.row.date_approved) }} -->
            {{ $d(new Date(props.row.date_approved), 'long') }}
          </span>
        </q-td>
      </template>
      <template #body-cell-date_created="props">
        <q-td :props="props">
          <span style="white-space: initial;">
            {{ $d(props.row.date_created, 'long') }}
          </span>
        </q-td>
      </template>
      <template #body-cell-transaction_amount="props">
        <q-td :props="props">
          <span style="white-space: initial;">
            {{ $n(Number(props.row.transaction_amount)) }}
          </span>
        </q-td>
      </template>
      <template #body-cell-fee_details_amount="props">
        <q-td :props="props">
          <span style="white-space: initial;">
            {{ $n(Number(props.row.fee_details_amount)) }}
          </span>
        </q-td>
      </template>
      <template #body-cell-trans_net_amount="props">
        <q-td :props="props">
          <span style="white-space: initial;">
            {{ $n(Number(props.row.trans_net_amount)) }}
          </span>
        </q-td>
      </template>
      <template #body-cell-trans_total_amount="props">
        <q-td :props="props">
          <span style="white-space: initial;">
            {{ $n(Number(props.row.trans_total_amount)) }}
          </span>
        </q-td>
      </template>
    </q-table>
  </CardSectionWrapper>
</template>

<script setup lang="ts">
import type {IPaymentList} from '../../IDashboard';
import CardSectionWrapper from '@/components/cardSectionWrapper/CardSectionWrapper.vue';
import type { ICardSectionWrapper } from '@/components/cardSectionWrapper/CardSectionWrapper.vue';


export interface IPaymentTable extends ICardSectionWrapper{
		title: string;
	rows: Array<IPaymentList>

}

// interface EnumServiceItems extends Array<EnumServiceItem>{}

// const paymentTableRows = defineProps<{
// 	title: string;
// 	rows: Array<IPaymentList>
// }>()

const paymentTableRows = defineProps<IPaymentTable>()

const columns = [
  { name: 'mp_id', required: true, label: 'mp_id', field: 'mp_id', sortable: true},
	{ name: 'operation_type', required: true, label: 'operation_type', field: 'operation_type', sortable: true},
  { name: 'card_id_type', required: true, label: 'card_id_type', field: 'card_id_type', sortable: true},
  { name: 'card_id_number', required: true, label: 'card_id_number', field: 'card_id_number', sortable: true},
  { name: 'card_first_six_digits', required: true, label: 'card_first_six_digits', field: 'card_first_six_digits', sortable: true},
  { name: 'date_approved', required: true, label: 'date_approved', field: 'date_approved', sortable: true},
  { name: 'date_created', required: true, label: 'date_created', field: 'date_created', sortable: true},
  { name: 'api_call_id', required: true, label: 'api_call_id', field: 'api_call_id', sortable: true},
  { name: 'fee_details_amount', required: true, label: 'fee_details_amount', field: 'fee_details_amount', sortable: true},
  { name: 'fee_details_type', required: true, label: 'fee_details_type', field: 'fee_details_type', sortable: true},
  { name: 'installments', required: true, label: 'installments', field: 'installments', sortable: true},
  { name: 'order_type', required: true, label: 'order_type', field: 'order_type', sortable: true},
  { name: 'payment_method_id', required: true, label: 'payment_method_id', field: 'payment_method_id', sortable: true},
  { name: 'payment_type_id', required: true, label: 'payment_type_id', field: 'payment_type_id', sortable: true},
  { name: 'status', required: true, label: 'status', field: 'status', sortable: true},
  { name: 'status_detail', required: true, label: 'status_detail', field: 'status_detail', sortable: true},
  { name: 'taxes_amount', required: true, label: 'taxes_amount', field: 'taxes_amount', sortable: true},
  { name: 'transaction_amount', required: true, label: 'transaction_amount', field: 'transaction_amount', sortable: true},
  { name: 'trans_net_amount', required: true, label: 'trans_net_amount', field: 'trans_net_amount', sortable: true},
  { name: 'trans_total_amount', required: true, label: 'trans_total_amount', field: 'trans_total_amount', sortable: true}
]
</script>
