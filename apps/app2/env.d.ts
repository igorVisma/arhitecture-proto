/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly APP_2_BASE_PATH: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
