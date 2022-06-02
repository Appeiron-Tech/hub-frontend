import PublicService from "@/views/settings/services/Public.services";
import type {IProfileForEditing} from "@/models/user/IUser";
import {createErrorNotification, createPositiveNotification} from "@/utils/notifications";
import {reactive} from "vue";

export class  SettingsController {
  private _publicService: PublicService = new PublicService();

  constructor() {
  }

/**
 * It takes a user object, sends it to the server, and then shows a notification based on the response.
 * @param {IProfileForEditing} p_user - IProfileForEditing
 */
  async saveEditedUser(p_user: IProfileForEditing, p_email: string) {
    const response = await this._publicService.editUser(p_user, p_email);
    this.showOperationNotification(response.status.toString(), 'Guardado correctamente', 'Hubo un error');
  }


  public showOperationNotification(
    state: string,
    positiveMessage: string,
    negativeMessage: string
  ) {
    if (state.startsWith("2")) {
      createPositiveNotification(positiveMessage);
    } else if (state.startsWith("4") || state.startsWith("5")) {
      createErrorNotification(negativeMessage);
    }
  }
}

const settingsController = reactive(new SettingsController());
export default settingsController;