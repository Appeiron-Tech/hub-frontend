import { reactive } from "vue";
import TeamService from "../../service/Team.services";

export interface ITeam {
  id: string;
  name: string;
  email: string;
  rol: string;
  state?: string;
  local?: string;
}

interface IRol {
  name: string;
}

export class Team {
  private _m_teamList: Array<ITeam> = [];
  private _m_team_service: TeamService = new TeamService();

  constructor() {}

  get TeamList(): Array<ITeam> {
    return this._m_teamList;
  }

  set TeamList(value: Array<ITeam>) {
    this._m_teamList = value;
  }

  public loadInfo() {
    //TODO: FETCH DATA WITH API
    this._m_teamList = this._m_team_service.getAll();
  }

  public removeCollaborator(p_collaboratorId: string) {
    this._m_team_service.deleteCollaborator(p_collaboratorId);
  }

  public editCollaborator(
    p_collaborator: ITeam,
    p_isNew: boolean,
    p_collaboratorId?: string
  ) {
    p_isNew
      ? this._m_team_service.addNewCollaborator(p_collaborator)
      : this._m_team_service.editExistingCollaborator(
          p_collaboratorId!,
          p_collaborator
        );
  }
}

const teamController = reactive(new Team());
export default teamController;
