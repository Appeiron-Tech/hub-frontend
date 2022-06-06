import { reactive } from "vue";

import type { IConfig } from "@/controller/IController";
import User from "@/models/user/User";

export class Controller {
	private _config: IConfig; 
	private _loadingConfig: boolean = true;

	private _drawer: boolean = true;

	private m_user: User | any = reactive(new User());

	constructor() {
		this._config = {}
	}

	/**
	 * Getters / Setters
	 */
	get loadingConfig(): boolean {
		return this._loadingConfig;
	}
	set loadingConfig(value: boolean) {
		this._loadingConfig = value;
	}

	get drawer(): boolean {
		return this._drawer
	}
	set drawer(value: boolean) {
		this._drawer = value;
	}

	public getConfig(): IConfig {
		return this._config
	}

	get user(): User{
		return this.m_user;
	}
	set user(p_user: User){
		this.m_user = p_user;
	}

	/**
	 * Methods
	 */
	// Method used for async functions
	public init(){
		// Do async calls and then set loading as false
		//TODO: i've commented this
		//TODO
		this.m_user.getProfile().finally(() => {
      this._loadingConfig = false;
    });

	}
}

const appController = reactive( new Controller);
appController.init()
export default appController;