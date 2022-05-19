import {reactive} from "vue";
import type {IStore} from "../../../direction/direction";
import StoreService from "../../../../services/store/Store.services";
import TeamService from "../../service/Team.services";
import type {ITeam, ITeamSave} from "./ITeam";
import directionController from "@/views/settings/myEnterprise/components/direction/direction";

interface IRol {
  name: string;
}

export class Team {
  private _m_teamList: Array<any> = [];
  private _m_team_service: TeamService = new TeamService();
  private _m_localOptions: Array<any> = [];
  private _m_shared_service: StoreService = new StoreService();

  constructor() {
  }

  get localOptions(): Array<any> {
    return this._m_localOptions;
  }

  get teamList(): (Array<ITeam>) {
    return this._m_teamList;
  }

  public async loadInfo() {
    this._m_teamList = directionController.Stores.map((e) => e.workers);
    this._m_teamList = Array.from(this._m_teamList).flat()
    console.log("%c⧭", "color: #e50000", this._m_teamList);
    this._m_localOptions = await this._m_shared_service.getAllStores();
    this._m_localOptions = this._m_localOptions.map(e => {
      return {
        id: e.id,
        label: e.store
      }
    })
    console.log("%c⧭", "color: #e70000", this._m_localOptions);
  }

  public removeCollaborator(p_collaboratorId: string) {
    this._m_team_service.deleteCollaborator(p_collaboratorId);
  }

  public async editCollaborator(
    p_collaborator: ITeamSave,
    p_isNew: boolean,
    p_collaboratorId?: string,
    p_storeId?: any
  ) {
    p_collaborator.storeId = p_storeId;
    console.log("collab: "+ p_collaborator);
    console.log("sdsadsdasdsadddd4444",p_storeId)
    console.log("class: "+ Object.prototype.toString.call(p_storeId))
    p_isNew
      ? await this._m_shared_service.createNewCollaborator(p_collaborator, p_storeId.id!)
      : this._m_team_service.editExistingCollaborator(
        p_collaboratorId!,
        p_collaborator
      );
  }
}

const teamController = reactive(new Team());
export default teamController;
