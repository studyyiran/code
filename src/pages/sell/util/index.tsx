export function removeAllSpace(str: string) {
  return str.replace(/\s+/g, "").toLowerCase().split('&').join('');
}