// Add enable-xr attribute support for WebSpatial
declare module "preact" {
  namespace JSX {
    interface HTMLAttributes<T> {
      "enable-xr"?: boolean | "";
      "enable-xr-monitor"?: boolean | "";
      debugName?: string;
    }
  }
}

export {};
