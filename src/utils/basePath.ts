declare const __BASE_PATH__: string | undefined;

const rawBasePath = typeof __BASE_PATH__ !== "undefined" ? __BASE_PATH__ : "";
const trimmed =
  rawBasePath.endsWith("/") && rawBasePath !== "/"
    ? rawBasePath.slice(0, -1)
    : rawBasePath;

export const BASE_PATH = trimmed === "/" ? "" : trimmed;
export const withBasePath = (path: string) => {
  if (!path) return BASE_PATH || "/";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return BASE_PATH ? `${BASE_PATH}${normalized}` : normalized;
};
