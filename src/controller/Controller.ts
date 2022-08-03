import { reactive } from "vue";

import type { IConfig } from "@/controller/IController";
import User from "@/models/user/User";
import { StatusCodes } from "http-status-codes";

export class Controller {
	private _config: IConfig; 
	private _loadingConfig: boolean = true;

	private _drawer: boolean = false;
	private _miniState: boolean = window.innerWidth < 500;

	// TODO: this any is a temporal solution
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
		return this._drawer;
	}
	set drawer(value: boolean) {
		this._drawer = value;
	}

	get miniState(): boolean {
		return this._miniState;
	}
	set miniState(value: boolean){
		this._miniState = value;
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
		this.m_user.getProfile().finally(() => {
      this._loadingConfig = false;
    });

	}
}

const appController = reactive( new Controller);
appController.init()
export default appController;