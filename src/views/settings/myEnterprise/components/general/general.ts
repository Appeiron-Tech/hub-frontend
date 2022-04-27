
import { reactive } from 'vue';
interface IGeneralSettings{
  enterpriseName: string;
  ordersNum: number;
  mainNum: number;
  currency: Array<ICurrency>;
  language: Array<ILanguage>;
  selectedCurrency: ICurrency;
  selectedLanguage: ICurrency;
}

interface ICurrency{
  label: string;
  value: string
}

interface ILanguage {
  label: string;
  value: string;
}


export class GeneralSettings{
  
  private m_generalSettingInfo: IGeneralSettings | undefined = undefined;

  constructor(){}

  get generalSettigsInfo(): IGeneralSettings{
    return this.m_generalSettingInfo!!;
  }

  set generalSettigsInfo(p_generalSettings: IGeneralSettings){
    this.m_generalSettingInfo = p_generalSettings;
  }

}

const generalSettings = reactive(new GeneralSettings());
export default generalSettings;