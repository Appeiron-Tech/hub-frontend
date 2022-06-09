import PublicService from "@/views/settings/services/Public.services";
import { reactive } from "vue";
import type {
  IClientQuestions,
  IGeneralSettings,
  IGerneralOptions,
} from "./IGeneral";
import GeneralService from "./service/General.services";

export class GeneralSettings {
  private m_generalSettingInfo: IGeneralSettings | undefined = undefined;

  private m_generalOptions: IGerneralOptions | any = [];

  private _m_clientQuestions: Array<IClientQuestions> | undefined = undefined;

  private publicService: PublicService = new PublicService();
  private generalService: GeneralService = new GeneralService();

  constructor() {}

  /**
   * Getter m_clientQuestions
   * @return {Array<IClientQuestions> }
   */
  public get m_clientQuestions(): Array<IClientQuestions> {
    return this._m_clientQuestions!;
  }

  /**
   * Setter m_clientQuestions
   * @param {Array<IClientQuestions> } value
   */
  public set m_clientQuestions(value: Array<IClientQuestions>) {
    this._m_clientQuestions = value;
  }

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

  async loadInfo() {
    this.m_generalSettingInfo = (
      await this.generalService.getClientInformation()
    ).data;
    console.log("%c⧭", "color: #7f2200", this.m_generalSettingInfo);
    this.loadOptions();
    this._m_clientQuestions = await (
      await this.publicService.getClientQuestions()
    ).data;
  }

  loadOptions() {
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
