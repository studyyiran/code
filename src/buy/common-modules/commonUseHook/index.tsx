import { useParams } from "react-router-dom";

export function UseGetParams() {
  const result = useParams();
  try {
    Object.keys(result).forEach((key: string) => {
      if (result[key]) {
        const arr = result[key].split(" ");
        result[key] = arr ? arr[0] : "";
      }
    });
  } catch (e) {
    console.error(e);
  }

  return result;
}
