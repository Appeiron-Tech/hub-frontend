import ApiService from "@/models/ApiService";
import type { ITeam, ITeamSave } from "../teamTable/models/ITeam";
import type { Team } from "../teamTable/models/Team";
import StoreService from "@/views/settings/myEnterprise/services/store/Store.services";

export default class TeamService extends ApiService {
  constructor() {
    super({ baseURL: "/team" });
  }



  deleteCollaborator(collaboratorId: string) {
    console.log("Collaborator with id: - " + collaboratorId + "  was deleted");
  }

  addNewCollaborator(p_collaborator: ITeamSave) {
    console.log("ne collaborator added" + p_collaborator);
  }

  editExistingCollaborator(
    p_collaboratorId: string,
    p_collaborator: ITeamSave
  ) {
    console.log(
      "Collaborator with ID: " +
        p_collaboratorId +
        "    was edited" +
        p_collaborator
    );
  }
}
