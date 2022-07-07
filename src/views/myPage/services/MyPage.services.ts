import ApiService from "@/models/ApiService";

export default class MyPageService extends ApiService {
  constructor() {
    super({ baseURL: "/mypage" });
  }
  async saveSelectedColors(primaryColor: string, secondaryColor: string) {
    console.log(
      "%c⧭",
      "color: #ffff00",
      `FROM SERVICE, PRIMARY COLOR -> ${primaryColor} --- SECONDARY COLOR --> ${secondaryColor}`
    );
  }
}
