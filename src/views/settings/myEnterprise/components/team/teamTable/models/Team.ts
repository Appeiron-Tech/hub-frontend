import {reactive} from "vue";

export interface ITeam {
  name: string,
  email: string,
  rol: string

}

interface IRol {
  name: string
}

export class Team {
  private _m_teamList: Array<ITeam> = [];

  constructor() {
  }


  get TeamList(): Array<ITeam> {
    return this._m_teamList;
  }

  set TeamList(value: Array<ITeam>) {
    this._m_teamList = value;
  }

  public loadInfo() {
    //TODO: FETCH DATA WITH API
    this._m_teamList = [
      {
        name: 'Sebastian',
        email: 'sb@gmail.com',
        rol: 'Administrator'
      },
      {
        name: 'Juan',
        email: 'sjuanb@gmail.com',
        rol: 'Administrator'
      },
      {
        name: 'Rosa',
        email: 'rosa@gmail.com',
        rol: 'Administrator'
      }
    ]

  }
}

const teamController = reactive(new Team());
export default teamController;