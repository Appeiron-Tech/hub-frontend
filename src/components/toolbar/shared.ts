import { reactive } from "vue";

export class SharedAttributes {
  private m_isSideBarExpanded: boolean;

  constructor() {
    this.m_isSideBarExpanded = false;
  }

  get isSideBarExpanded(): boolean {
    return this.m_isSideBarExpanded;
  }

  set isSideBarExpanded(value: boolean) {
    this.m_isSideBarExpanded = value;
  }
}

const sharedAttributes = reactive(new SharedAttributes());
export default sharedAttributes;