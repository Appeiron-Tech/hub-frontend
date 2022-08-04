export interface IConfig {
 // Config params
}

export interface IEnvironment {
	code: string;
	label: string;
}

export interface IMenuItem {
	code: string;
	environment?: Array<string>
}
