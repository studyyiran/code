import { expressOptionConfig } from "../context/staticData";

export function nameToContent(token: string) {
  const result = expressOptionConfig.find(({ tokenId, title }) => {
    return String(tokenId) === String(token);
  });
  return result ? result.title : "";
  // return `USPS ${name}`;
}
