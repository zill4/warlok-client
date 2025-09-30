/// <reference types="react" />

declare module "react" {
  interface HTMLAttributes<T> {
    "enable-xr"?: boolean | "";
    "enable-xr-monitor"?: boolean | "";
    debugName?: string;
  }
}

export {};
