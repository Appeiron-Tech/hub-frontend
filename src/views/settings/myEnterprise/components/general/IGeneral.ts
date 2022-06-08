export interface IGerneralOptions {
  businessTypeOptions: Array<string>;
  sellsTypeOptions: Array<string>;
  customerTypeOptions: Array<string>;
  followersTypeOptions: Array<string>;
  deliveryTypeOptions: Array<string>;
  languageOptions: Array<string>;
  currencyOptions: Array<string>;
}

export interface IOptions {
  label: string;
  value: string;
}

export interface IGeneralSettings {
  enterpriseName: string;
  ordersNum?: number;
  mainNum?: number;
  language: string;
  currency: string;
  businessType: string;
  businessSells: string;
  customersPerWeek: string;
  followers: string;
  deliveryType: string;
  igURL: string;
  fbURL: string;
}

interface ICurrency {
  label: string;
  value: string;
}

interface ILanguage {
  label: string;
  value: string;
}

export interface IgeneralTypeValue {
  label: string;
  value: string;
}
