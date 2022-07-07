import type { IClient } from "@/models/IClient";
import ClientService from "@/services/client.services";
import { reactive } from "vue";
import type { IColor } from "./models/IMyPage";
import MyPageService from "./services/MyPage.services";

class MyPageController {
  private clientService: ClientService = new ClientService();
  private clientInformation: IClient | undefined = undefined;
  private myPageService: MyPageService = new MyPageService();

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

  async saveColor(
    primaryColors: Array<IColor>,
    secondaryColors: Array<IColor>
  ) {
    console.log("%c⧭", "color: #f200e2", "FROM CONTROLLER");
    console.log("%c⧭", "color: #f200e2", { primaryColors, secondaryColors });
    const primaryColor = primaryColors.filter((e) => e.selected === true);
    const secondaryColor = secondaryColors.filter((e) => e.selected === true);
    this.myPageService.saveSelectedColors(
      primaryColor[0].color,
      secondaryColor[0].color
    );
    //TODO: backend communication
  }
}

const myPageController = reactive(new MyPageController());
export default myPageController;
