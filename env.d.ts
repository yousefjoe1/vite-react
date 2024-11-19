/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
    readonly VITE_REACT_APP_URL: string
    // Add more env variables as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
