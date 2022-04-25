/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_API_PREFIX_BASE: string;
    readonly VITE_DEFAULT_LANGUAGE: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}