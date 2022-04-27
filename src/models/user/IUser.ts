export interface IProfile {
  _id: string;
  email: string;
  user_name: string;
  first_name: string;
  last_name: string;
  language?: string;
  password: string;
  photo_url: string | null;
  apps: {
    products: boolean;
    inventory: boolean;
  };
}
