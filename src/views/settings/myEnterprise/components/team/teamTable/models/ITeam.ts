
export interface ITeam {
  id: string;
  name: string;
  email?: string;
  jobTitle: string;
  isActive?: string;
  phone?: number;
  countryCode: number;
  phoneType?: string;
  createdAt: string
}

export interface ITeamSave {
  name: string;
  email: string;
  jobTitle: string;
  state?: boolean;
  phone? : string;
  phoneType?: string;
  storeId?: number;
  countryCode?: number
}
