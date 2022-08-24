import { ref, type Ref } from "vue";
import type { ICardFormWrapper } from "./ICardFormWrapper";

export class CCardFormWrapper {
  private _title: Ref<string | undefined>  = ref(undefined);
  private _description: Ref<string | undefined>  = ref(undefined);
  private _show: Ref<boolean | undefined> = ref(undefined);

  private _loading: Ref<boolean | undefined> = ref(undefined);

  constructor(config: ICardFormWrapper){
    this._title.value = config.title
    this._description.value = config.description
    this._show.value = config.show
    this._loading.value = config.loading
  }

  get title(): string | undefined{
    return this._title.value
  }
  set title(value: string | undefined){
    this._title.value = value
  }

  get description(): string | undefined{
    return this._description.value
  }
  set description(value: string | undefined){
    this._description.value = value
  }

  get show(): boolean | undefined{
    return this._show.value
  }
  set show(value: boolean | undefined){
    this._show.value = value
  }

  get loading(): boolean | undefined{
    return this._loading.value
  }
  set loading(value: boolean | undefined){
    this._loading.value = value
  }

}