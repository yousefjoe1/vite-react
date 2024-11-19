
/// <reference types="vite-plugin-pwa/react" />
declare module 'virtual:pwa-register' {
    export function registerSW(options?: {
      onRegistered?: (registration: ServiceWorkerRegistration) => void;
      onRegisterError?: (error: Error) => void;
    }): void;
  }

