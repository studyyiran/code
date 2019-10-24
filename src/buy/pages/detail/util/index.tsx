import { GlobalSettingContext, IGlobalSettingContext } from "../../../context";
import { useContext } from "react";
import { RenderByCondition } from "../../../components/RenderByCondition";

export function getDescArr(info: any, displayName: any) {
  const firstLine: any[] = [];
  const secondLine: any[] = [];
  const thirdLine: any[] = [];
  if (typeof info === "string") {
    try {
      info = JSON.parse(info);
    } catch (e) {
      console.error(e);
    }
  }
  if (info && info.length && info instanceof Array) {
    info.forEach((item: any) => {
      const { bpvName, tag } = item;
      if (tag) {
        if (tag === "ISCOLOR") {
          secondLine.push(bpvName);
        } else {
          thirdLine.push(`(${bpvName})`);
        }
      } else {
        firstLine.push(bpvName);
      }
    });
  }
  return [
    `${displayName} ${firstLine.join("")}`,
    [...secondLine, ...thirdLine].join(" ")
  ];
}

export function useGetProductImg(data: any) {
  const globalSettingContext = useContext(GlobalSettingContext);
  const {
    globalSettingContextValue
  } = globalSettingContext as IGlobalSettingContext;
  const { isMobile } = globalSettingContextValue;
  const { buyProductImgPc, buyProductImgM } = data;
  let imgList;
  if (isMobile) {
    imgList = buyProductImgM;
  } else {
    imgList = buyProductImgPc;
  }
  if (typeof imgList === "string") {
    imgList = (imgList as string).split(",");
  }
  return imgList && imgList.length ? imgList[0] : "";
}
