import ApiService from "@/models/ApiService";
import type { ITeam, ITeamSave } from "../teamTable/models/ITeam";
import type { Team } from "../teamTable/models/Team";
import StoreService from "@/views/settings/myEnterprise/services/store/Store.services";

export default class TeamService extends ApiService {
  constructor() {
    super({ baseURL: "/team" });
  }



  deleteCollaborator(collaboratorId: string) {
     
  }

  addNewCollaborator(p_collaborator: ITeamSave) {
  
  }

  editExistingCollaborator(
    p_collaboratorId: string,
    p_collaborator: ITeamSave
  ) {
  }
}
