import type { IClient } from "@/models/IClient";
import ClientService from "@/services/client.services";
import { reactive } from "vue";

class MyPageController {
  private clientService: ClientService = new ClientService();
  private clientInformation: IClient | undefined = undefined;

  constructor() {}

  async loadInfo() {
    this.clientInformation = await this.clientService.getClientInformation();
  }

  /**
   * Getter $clientInformation
   * @return {IClient }
   */
  public get $clientInformation(): IClient {
    return this.clientInformation!;
  }

  /**
   * Setter $clientInformation
   * @param {IClient } value
   */
  public set $clientInformation(value: IClient) {
    this.clientInformation = value;
  }

  async changeImage(p_formdata: FormData, isCover: boolean) {
    console.log("%c⧭", "color: #ff0000", "Image from controller", isCover);
    await this.clientService.changeImage(p_formdata);
  }
}

const myPageController = reactive(new MyPageController());
export default myPageController;
