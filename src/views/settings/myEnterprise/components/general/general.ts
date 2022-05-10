import { reactive } from "vue";
interface IGeneralSettings {
  enterpriseName: string;
  ordersNum: number;
  mainNum: number;
  currency: Array<ICurrency>;
  language: Array<ILanguage>;
  selectedCurrency: ICurrency;
  selectedLanguage: ICurrency;
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

export class GeneralSettings {
  private m_generalSettingInfo: IGeneralSettings | undefined = undefined;
  private m_businessTypeOptions: Array<IgeneralTypeValue> = [];
  private m_currencyOptions: Array<IgeneralTypeValue> = [];

  constructor() {}

  public get BusinessTypeOptions(): Array<IgeneralTypeValue> {
    return this.m_businessTypeOptions;
  }

  public set BusinessTypeOptions(value: Array<IgeneralTypeValue>) {
    this.m_businessTypeOptions = value;
  }

  get generalSettigsInfo(): IGeneralSettings {
    return this.m_generalSettingInfo!!;
  }

  set generalSettigsInfo(p_generalSettings: IGeneralSettings) {
    this.m_generalSettingInfo = p_generalSettings;
  }

  public get CurrencyOptions(): Array<IgeneralTypeValue> {
    return this.m_currencyOptions;
  }

  loadInfo() {
    //TODO: this is hardcoded
    this.m_businessTypeOptions = [
      { label: "Tienda", value: "tienda" },
      { label: "Libreria", value: "libreria" },
    ];

    this.m_currencyOptions = [
      { label: "PEN", value: "pen" },
      { label: "USD", value: "usd" },
      { label: "EUR", value: "eur" },
    ];
  }
}

const generalSettings = reactive(new GeneralSettings());
export default generalSettings;
