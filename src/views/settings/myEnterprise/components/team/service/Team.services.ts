import ApiService from "@/models/ApiService";
import type { ITeam, Team } from "../teamTable/models/Team";

export default class TeamService extends ApiService {
  constructor() {
    super({ baseURL: "/team" });
  }

  //TODO
  getAll(): Array<ITeam> {
    return [
      {
        id: "sdsadsfdhfkdsdscxzc",
        name: "Sebastian",
        email: "sb@gmail.com",
        rol: "Administrator",
        state: "Vacaciones",
        local: "Miraflores",
      },
      {
        id: "kjnfkjdshgfdsfbkdsj",
        name: "Juan",
        email: "sjuanb@gmail.com",
        rol: "Administrator",
        state: "Vacaciones",
        local: "Chorrillos",
      },
      {
        id: "amsdlajshdladwih",
        name: "Daniela",
        email: "rosa@gmail.com",
        rol: "Administrator",
        state: "Vacaciones",
        local: "Surco",
      },
    ];
  }

  deleteCollaborator(collaboratorId: string) {
    console.log("Collaborator with id: - " + collaboratorId + "  was deleted");
  }

  addNewCollaborator(p_collaborator: ITeam){
    console.log("ne collaborator added" + p_collaborator);
  }

  editExistingCollaborator(p_collaboratorId: string, p_collaborator: ITeam){
    console.log("Collaborator with ID: "+ p_collaboratorId + "    was edited" + p_collaborator);
  }
}
