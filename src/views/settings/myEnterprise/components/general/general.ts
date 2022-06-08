import { reactive } from "vue";
import type { IGeneralSettings, IGerneralOptions } from "./IGeneral";

export class GeneralSettings {
  private m_generalSettingInfo: IGeneralSettings | undefined = undefined;

  private m_generalOptions: IGerneralOptions | any = [];

  constructor() {}

  /**
   * Getter $m_generalSettingInfo
   * @return {IGeneralSettings }
   */
  public get $m_generalSettingInfo(): IGeneralSettings {
    return this.m_generalSettingInfo!;
  }

  /**
   * Getter $m_generalOptions
   * @return {IGerneralOptions }
   */
  public get $m_generalOptions(): IGerneralOptions {
    return this.m_generalOptions!;
  }

  /**
   * Setter $m_generalSettingInfo
   * @param {IGeneralSettings } value
   */
  public set $m_generalSettingInfo(value: IGeneralSettings) {
    this.m_generalSettingInfo = value;
  }

  /**
   * Setter $m_generalOptions
   * @param {IGerneralOptions } value
   */
  public set $m_generalOptions(value: IGerneralOptions) {
    this.m_generalOptions = value;
  }

  loadInfo() {
    this.loadOptions();
    this.$m_generalSettingInfo = {
      enterpriseName: "",
      ordersNum: undefined,
      mainNum: undefined,
      language: "",
      currency: "",
      businessType: "",
      businessSells: "",
      customersPerWeek: "",
      followers: "",
      deliveryType: "",
      igURL: "",
      fbURL: "",
    };
  }

  loadOptions() {
    this.m_generalOptions!.businessTypeOptions = [
      "general-options-business-type-1",
      "general-options-business-type-2",
      "general-options-business-type-3",
      "general-options-business-type-4",
      "general-options-business-type-5",
      "general-options-business-type-6",
    ];
    this.m_generalOptions!.sellsTypeOptions = [
      "general-options-business-sell-1",
      "general-options-business-sell-2",
      "general-options-business-sell-3",
      "general-options-business-sell-4",
      "general-options-business-sell-5",
    ];
    this.m_generalOptions!.customerTypeOptions = [
      "1-50",
      "50-100",
      "100-500",
      "500-1000",
      "1000-5000",
      "+5000",
    ];
    this.m_generalOptions!.followersTypeOptions = [
      "1-50",
      "50-100",
      "100-500",
      "500-1000",
      "1000-5000",
      "+5000",
    ];
    this.m_generalOptions!.deliveryTypeOptions = [
      "general-options-delivery-type-1",
      "general-options-delivery-type-2",
      "general-options-delivery-type-3",
      "general-options-delivery-type-4",
    ];
    this.$m_generalOptions.languageOptions = [
      "general-options-language-1",
      "general-options-language-2",
      "general-options-language-3",
    ];
    this.$m_generalOptions.currencyOptions = [
      "PEN",
      "USD",
      "EUR",
      "GBP",
      "JPY",
      "CNY",
      "AUD",
      "CAD",
      "CHF",
      "SEK",
    ];
  }
}

const generalSettings = reactive(new GeneralSettings());
export default generalSettings;
