import { useParams } from "react-router-dom";

/*
这个函数有更好的健壮性.
他清除了过程中的空格.
他应该代替useParams来使用.用于参数的获取
 */

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
