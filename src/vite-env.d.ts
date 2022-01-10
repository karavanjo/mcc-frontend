/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_REALM_APP_ID: string
  readonly VITE_REACT_APP_REALM_SERVICE_NAME: string
  readonly VITE_REACT_APP_DB_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
