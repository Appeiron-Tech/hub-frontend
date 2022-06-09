export interface IGerneralOptions {
  languageOptions: Array<string>;
  currencyOptions: Array<string>;
}

export interface IGeneralSettings {
  enterpriseName: string;
  ordersNum?: number;
  mainNum?: number;
  language: string;
  currency: string;
  urlIG: string;
  urlFB: string;
  answers: Array<IAnswer>;
}

//NOTE: THIS IS WHAT BACKEND EXPOSE
export interface IClientQuestions {
  id: number;
  questionCode: string;
  question: string;
  type: string;
  order: number;
  createdAt: string;
  options: Array<IOption>;
}
export interface IOption {
  id: number;
  optionCode: string;
  option: string;
  order: number;
}

export interface IAnswer {
  id?: number;
  questionCode: string; //max length 16
  question: string; //max length 16
  questionOptionCode: string; //max length 16
  answer: string; //max length 512
  updatedAt: Date | string;
  createdAt: Date | string;
}
