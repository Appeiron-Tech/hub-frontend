import { reactive } from "vue";

import type { IConfig } from "@/controller/IController";

export class Controller {
	private _config: IConfig; 
	private _loadingConfig: boolean = true;

	private _drawer: boolean = true;

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

	/**
	 * Methods
	 */
	// Method used for async functions
	public init(){
		// Do async calls and then set loading as false
		this._loadingConfig = false;
	}
}

const appController = reactive( new Controller);
appController.init()
export default appController;